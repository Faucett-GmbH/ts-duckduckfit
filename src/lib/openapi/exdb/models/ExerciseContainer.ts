/* tslint:disable */
/* eslint-disable */
/**
 * DuckDuckFit Exercise Database API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@duckduckfit.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Exercise } from './Exercise';
import {
    ExerciseFromJSON,
    ExerciseFromJSONTyped,
    ExerciseToJSON,
    ExerciseToJSONTyped,
} from './Exercise';
import type { ExerciseOnto } from './ExerciseOnto';
import {
    ExerciseOntoFromJSON,
    ExerciseOntoFromJSONTyped,
    ExerciseOntoToJSON,
    ExerciseOntoToJSONTyped,
} from './ExerciseOnto';

/**
 * 
 * @export
 * @interface ExerciseContainer
 */
export interface ExerciseContainer {
    /**
     * 
     * @type {Exercise}
     * @memberof ExerciseContainer
     */
    exercise: Exercise;
    /**
     * 
     * @type {ExerciseOnto}
     * @memberof ExerciseContainer
     */
    onto: ExerciseOnto;
}

/**
 * Check if a given object implements the ExerciseContainer interface.
 */
export function instanceOfExerciseContainer(value: object): value is ExerciseContainer {
    if (!('exercise' in value) || value['exercise'] === undefined) return false;
    if (!('onto' in value) || value['onto'] === undefined) return false;
    return true;
}

export function ExerciseContainerFromJSON(json: any): ExerciseContainer {
    return ExerciseContainerFromJSONTyped(json, false);
}

export function ExerciseContainerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExerciseContainer {
    if (json == null) {
        return json;
    }
    return {
        
        'exercise': ExerciseFromJSON(json['exercise']),
        'onto': ExerciseOntoFromJSON(json['onto']),
    };
}

export function ExerciseContainerToJSON(json: any): ExerciseContainer {
    return ExerciseContainerToJSONTyped(json, false);
}

export function ExerciseContainerToJSONTyped(value?: ExerciseContainer | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'exercise': ExerciseToJSON(value['exercise']),
        'onto': ExerciseOntoToJSON(value['onto']),
    };
}

