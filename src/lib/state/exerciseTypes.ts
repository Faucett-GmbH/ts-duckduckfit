/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface Exercise {
  guid: string;
  /**
   * url safe unique resource identifier
   */
  uri: string;
  execution: ExerciseExecution;
  image_url: string | null;
  thumbnail_image_url: string | null;
  translations: ExerciseTranslation[];
}
export interface ExerciseTranslation {
  guid: string;
  locale: "en" | "de" | "es";
  /**
   * url safe unique resource identifier
   */
  uri: string;
  name: string;
  alternative_names?: string[];
  metadata_keywords?: string[];
  metadata_authors?: string[];
  video_url?: string | null;
  description: string;
  summary: string;
  instructions: string;
  tips?: string[];
}

export const ExerciseExecutionEnum = {
  WeightReps: 'WEIGHT_REPS',
  RepsOnly: 'REPS_ONLY',
  Duration: 'DURATION',
  WeightDuration: 'WEIGHT_DURATION',
  DistanceDuration: 'DISTANCE_DURATION',
  Distance: 'DISTANCE',
  WeightDistance: 'WEIGHT_DISTANCE'
} as const;
export type ExerciseExecution = typeof ExerciseExecutionEnum[keyof typeof ExerciseExecutionEnum];