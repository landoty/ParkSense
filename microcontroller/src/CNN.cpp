#include "CNN.h"
#include "model.h"

#include <esp_attr.h>
#include <Arduino.h>

constexpr int kTensorArenaSize = 3 * 1024 * 1024;

CNN::CNN() {
    static tflite::MicroErrorReporter micro_error_reporter;
    error_reporter = &micro_error_reporter;

    printf("Free heap: %d\n", ESP.getFreeHeap());
    printf("largest size (8bit): %d\n", heap_caps_get_largest_free_block(MALLOC_CAP_8BIT));
    printf("largest size (default): %d\n", heap_caps_get_largest_free_block(MALLOC_CAP_DEFAULT));
    printf("largest size (spiram): %d\n", heap_caps_get_largest_free_block(MALLOC_CAP_SPIRAM));
    printf("largest size (internal): %d\n", heap_caps_get_largest_free_block(MALLOC_CAP_INTERNAL));

    // get model (.tflite) from flash
    model = tflite::GetModel(_tmp_mobilenetv2_saved_model_tflite);
    if (model->version() != TFLITE_SCHEMA_VERSION)
    {
        error_reporter->Report(
        "Model provided is schema version %d not equal "
        "to supported version %d.",
        model->version(), TFLITE_SCHEMA_VERSION);
    return;
        return;
    }

    static tflite::MicroMutableOpResolver<4> resolver;
    resolver.AddAveragePool2D();
    resolver.AddConv2D();
    resolver.AddMaxPool2D();
    resolver.AddRelu();  

    tensor_arena = (uint8_t *)heap_caps_malloc(kTensorArenaSize, MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT);
    if (tensor_arena == NULL)
    {
        printf("Couldn't allocate memory of %d bytes\n", kTensorArenaSize);
        return;
    }
    printf("Free heap: %d\n", ESP.getFreeHeap());

    // Build an interpreter to run the model with.
    static tflite::MicroInterpreter static_interpreter(model, resolver, tensor_arena, kTensorArenaSize, error_reporter);
    interpreter = &static_interpreter;

    MicroPrintf("interpreter initialization");
    // Allocate memory from the tensor_arena for the model's tensors.
    TfLiteStatus allocate_status = interpreter->AllocateTensors();
    if (allocate_status != kTfLiteOk)
    {
        MicroPrintf("AllocateTensors() failed");
        return;
    }

    size_t used_bytes = interpreter->arena_used_bytes();
    MicroPrintf("Used bytes %d\n", used_bytes);

    // Obtain pointers to the model's input and output tensors.
    input = interpreter->input(0);
    output = interpreter->output(0);

    printf("tensor_arena: %p, input: %p\n", tensor_arena, input->data.uint8);
    printf("input->dims->size: %d\n", input->dims->size);
    printf("input->dims->data[0]: %d\n", input->dims->data[0]);
    printf("input->dims->data[1]: %d\n", input->dims->data[1]);
    printf("input->dims->data[2]: %d\n", input->dims->data[2]);
    printf("input->dims->data[3]: %d\n", input->dims->data[3]);
    printf("input->type: %d\n", input->type);
    printf("input->params.scale: %.3f\n", input->params.scale);
    printf("input->params.zero_point: %d\n", input->params.zero_point);
    
    float scale = output->params.scale;
    int zero_point = output->params.zero_point; 
    printf("output scale=%.3f, zero_point=%d\n", scale, zero_point);
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