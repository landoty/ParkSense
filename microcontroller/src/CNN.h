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
        tflite::MicroMutableOpResolver<4> *resolver;
        const tflite::Model *model; 
        tflite::MicroInterpreter *interpreter;
        tflite::ErrorReporter* error_reporter = nullptr;
        TfLiteTensor *input;
        TfLiteTensor *output;
        uint8_t *tensor_arena;
    
    public:
        CNN();
        TfLiteTensor* getInput();
        TfLiteStatus predict();
        TfLiteTensor* getOuput();
}; 
#endif