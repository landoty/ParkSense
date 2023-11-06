/*
 * Name: model_config.h
 * Authors: Landen Doty, Sepehr Noori
 * Description: macros for model
 * Date: 11/5/23
 */

#ifndef MODEL_CONFIG_H
#define MODEL_CONFIG_H

#define MODEL_IMAGE_WIDTH   96
#define MODEL_IMAGE_HEIGHT  96
#define NUM_CHANNELS         3 // BW
#define kCategory  2
const char* kCategoryLabels[kCategory] = {"Car", "Not Car"};
#endif
