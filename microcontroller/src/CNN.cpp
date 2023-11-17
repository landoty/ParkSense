#include "CNN.h"
//#include "custom_model.h"
#include "mobilenet_v2_int8.h"

#include <esp_attr.h>
#include <Arduino.h>

constexpr int kTensorArenaSize = 3 * 1024 * 1024;

CNN::CNN() {
    static tflite::MicroErrorReporter micro_error_reporter;
    error_reporter = &micro_error_reporter;

    // get model (.tflite) from flash
    model = tflite::GetModel(_mobilenet_v2_int8);
    if (model->version() != TFLITE_SCHEMA_VERSION)
    {
        error_reporter->Report(
        "Model provided is schema version %d not equal "
        "to supported version %d.",
        model->version(), TFLITE_SCHEMA_VERSION);
        return;
    }

    static tflite::MicroMutableOpResolver<14> resolver;
    resolver.AddAveragePool2D();
    resolver.AddConv2D();
    resolver.AddMaxPool2D();
    resolver.AddDepthwiseConv2D();
    resolver.AddRelu();
    resolver.AddSoftmax();
    resolver.AddReshape();
    resolver.AddFullyConnected();
    resolver.AddLogistic();
    resolver.AddQuantize();
    resolver.AddDequantize();
    resolver.AddMul();
    resolver.AddSub();
    resolver.AddAdd();

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
    float scale = output->params.scale;
    int zero_point = output->params.zero_point; 
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