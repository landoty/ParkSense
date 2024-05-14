/*********
 Name: CNN.cpp
 Authors: Landen Doty, Sepehr Noori
 Description: Implementation file for CNN object
 Date: 11/16/2023
*********/

#include "CNN.h"
//#include "custom_model.h"
// #include "mobilenet_v2_int8.h"
// #include "new_int8.h"
// #include "tflite_learn_14.h"
// #include "mobilenet_v2_int8.h"
// #include "ei_model.h"
// #include "mobilenetv2.h"
// #include "model.h"
// #include "mobilenet_v2_0417.h"
#include "mobilenet_v2_0421.h"


#include <esp_attr.h>
#include <Arduino.h>

constexpr int kTensorArenaSize = 625696;

CNN::CNN() {
    sleep(1);
    Serial.println("Called constructor");

    // get model (.tflite) from flash
    model = tflite::GetModel(mobilenet_v2_0421);
    if (model->version() != TFLITE_SCHEMA_VERSION)
    {
        error_reporter->Report(
        "Model provided is schema version %d not equal "
        "to supported version %d.",
        model->version(), TFLITE_SCHEMA_VERSION);
        return;
    }
    Serial.println("Model loaded");

    // add operators needed to the resolver
    static tflite::MicroMutableOpResolver<13> resolver;
    resolver.AddConv2D();
    resolver.AddDepthwiseConv2D();
    resolver.AddSoftmax();
    resolver.AddReshape();
    resolver.AddFullyConnected();
    resolver.AddAdd();
    resolver.AddPad();
    resolver.AddQuantize();
    resolver.AddMul();
    resolver.AddMean();
    resolver.AddLogistic();
    resolver.AddDequantize();
    resolver.AddSub();

    // allocated space for the model
    tensor_arena = (uint8_t *)heap_caps_malloc(kTensorArenaSize, MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT);
    if (tensor_arena == NULL)
    {
        Serial.printf("Couldn't allocate memory of %d bytes\n", kTensorArenaSize);
        return;
    }
    Serial.printf("Free heap: %d\n", ESP.getFreeHeap());

    // Build an interpreter to run the model with.
    static tflite::MicroInterpreter static_interpreter(model, resolver, tensor_arena, kTensorArenaSize);
    interpreter = &static_interpreter;

    Serial.println("interpreter initialization");
    // Allocate memory from the tensor_arena for the model's tensors.
    TfLiteStatus allocate_status = interpreter->AllocateTensors();
    if (allocate_status != kTfLiteOk)
    {
        Serial.println("AllocateTensors() failed");
        return;
    }
    size_t used_bytes = interpreter->arena_used_bytes();
    Serial.printf("Used bytes %d\n", used_bytes);

    // Obtain pointers to the model's input and output tensors.
    input = interpreter->input(0);
    output = interpreter->output(0);
}

TfLiteTensor* CNN::getInput() {
    return input;
}

TfLiteStatus CNN::predict() {
    return interpreter->Invoke();
}

TfLiteTensor* CNN::getOuput() {
    return output;
}