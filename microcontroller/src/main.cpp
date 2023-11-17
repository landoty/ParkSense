/*********
 Name: main.cpp
 Authors: Landen Doty, Sepehr Noori
 Description: Main driver code for parksense application
 Date: 11/5/2023

 Adapted from: 
    https://RandomNerdTutorials.com/esp32-cam-take-photo-save-microsd-card
    https://www.instructables.com/ESP32-CAM-Person-Detection-Expreiment-With-TensorF/
*********/

#include "esp_camera.h"
#include "Arduino.h"
#include "FS.h"                // SD Card ESP32
#include "SD_MMC.h"            // SD Card ESP32
#include "soc/soc.h"           // Disable brownour problems
#include "soc/rtc_cntl_reg.h"  // Disable brownour problems
#include "driver/rtc_io.h"
#include <EEPROM.h>            // read and write from flash memory
#include "CNN.h"

// Including tensorflow libs

//#include <TensorFlowLite_ESP32.h>
///#include "tensorflow/lite/micro/kernels/micro_ops.h"
//#include "tensorflow/lite/micro/micro_error_reporter.h"
//#include "tensorflow/lite/micro/micro_mutable_op_resolver.h"
//#include "tensorflow/lite/micro/micro_interpreter.h"
//#include "tensorflow/lite/schema/schema_generated.h"

// our model
#include "custom_model.h"

// define the number of bytes you want to access
#define EEPROM_SIZE 1

#define INPUT_W 96
#define INPUT_H 96
#define LED_BUILT_IN 21

// Pin definition for CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const String path_pred = "/predictions.txt";
const String path_img = "/image";

int pictureNumber = 0;

CNN *cnn;

uint32_t rgb565torgb888(uint16_t color)
{
    uint32_t r, g, b;
    r = g = b = 0; 
    r = (color >> 11) & 0x1F;
    g = (color >> 5) & 0x3F;
    b = color & 0x1F;
    r = (r << 3) | (r >> 2);
    g = (g << 2) | (g >> 4);
    b = (b << 3) | (b >> 2);
    return (r << 16) | (g << 8) | b;
}

int GetImage(camera_fb_t * fb, TfLiteTensor* input) 
{
    assert(fb->format == PIXFORMAT_RGB565);
    // Trimming Image
    int post = 0;
    int startx = (fb->width - INPUT_W) / 2;
    int starty = (fb->height - INPUT_H);
    for (int y = 0; y < INPUT_H; y++) {
        for (int x = 0; x < INPUT_W; x++) {
            int getPos = (starty + y) * fb->width + startx + x;
            uint16_t color = ((uint16_t *)fb->buf)[getPos];
            uint32_t rgb = rgb565torgb888(color);

            float *image_data = tflite::GetTensorData<float>(input);
            //delay(2000);

            image_data[post * 3 + 0] = ((rgb >> 16) & 0xFF);  // R
            image_data[post * 3 + 1] = ((rgb >> 8) & 0xFF);   // G
            image_data[post * 3 + 2] = (rgb & 0xFF);          // B
            post++;
        }
    }
    return 0;
}

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector

  Serial.begin(115200);
  while(!Serial);
  Serial.setDebugOutput(false);
  
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_RGB565; // PIXFORMAT_JPEG; // for streaming
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  
  cnn = new CNN();
  
  // Init Camera
  pinMode(LED_BUILT_IN, OUTPUT); // Set the pin as output
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  
  //Serial.println("Starting SD Card");
  if(!SD_MMC.begin()){
    Serial.println("SD Card Mount Failed");
    return;
  }
  
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE){
    Serial.println("No SD Card attached");
    return;
  }
}

void loop() {
  // take picture
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;

  fb = esp_camera_fb_get();

  if(!fb) {
    Serial.println("Camera capture failed");
    res = ESP_FAIL;
  }
  // classify
  else{
    Serial.println("image taken");
    GetImage(fb, cnn->getInput());
    Serial.println("making prediction");
    cnn->predict();
    float pred = cnn->getOuput()->data.f[0];
    Serial.printf("Prediction: %6.4f\n", pred);

    EEPROM.begin(EEPROM_SIZE);
    pictureNumber = EEPROM.read(0) + 1;
    fs::FS &fs = SD_MMC;

    // write to sd if car
    if(pred > 0.5) {
      Serial.printf("Car!");

      String path = path_img + String(pictureNumber) + ".jpg";
      File pic_file = fs.open(path.c_str(), FILE_WRITE);
      pic_file.write(fb->buf, fb->len);
      pic_file.close();
    }

    File pred_file = fs.open(path_pred.c_str(), FILE_APPEND);
    if(!pred_file){
      Serial.println("Failed to open file in writing mode");
    } 
    else {
      pred_file.print("Prediction " + String(pictureNumber) + ": " + String(pred) + "\n"); // payload (image), payload length
    }
    pred_file.close();
    EEPROM.write(0, pictureNumber);
    EEPROM.commit();
  }
  esp_camera_fb_return(fb); 
}
