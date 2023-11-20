/*********
 Name: CNN.cpp
 Authors: Landen Doty, Sepehr Noori
 Description: Header file for CNN object
 Date: 11/16/2023
*********/

#ifndef __CNN__
#define __CNN__ 


#include <TensorFlowLite_ESP32.h>
#include "tensorflow/lite/c/common.h"
#include "tensorflow/lite/micro/kernels/micro_ops.h"
#include "tensorflow/lite/micro/micro_error_reporter.h"
#include "tensorflow/lite/micro/micro_mutable_op_resolver.h"
#include "tensorflow/lite/micro/micro_interpreter.h"
#include "tensorflow/lite/schema/schema_generated.h"

namespace tflite
{
    template <unsigned int tOpCount>
    class MicroMutableOpResolver;
    class Model;
    class MicroInterpreter;
}

class CNN {
    private:
        // operator resolver
        tflite::MicroMutableOpResolver<4> *resolver;
        // model itself
        const tflite::Model *model; 
        // interpreter to run inference
        tflite::MicroInterpreter *interpreter;
        // error reporter
        tflite::ErrorReporter* error_reporter = nullptr;
        // input tensor
        TfLiteTensor *input;
        // output tensor
        TfLiteTensor *output;
        // arena to hold in/out intermediaries
        uint8_t *tensor_arena;
    
    public:
        CNN();
        TfLiteTensor* getInput();
        TfLiteStatus predict();
        TfLiteTensor* getOuput();
}; 
#endif