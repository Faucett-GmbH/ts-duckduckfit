import { z } from "zod";

export const noteTranslationSchema = z.object({
  locale: z.enum(["en", "de", "es"]),
  value: z.string().nullable(),
});

export const setTemplateSchema = z.object({
  exerciseGuid: z.string().min(1, "Please choose an exercise."),
  position: z.number().int().min(0),
  setType: z.enum(["warm_up", "working_set"]),
  targetReps: z.number().int().min(1, "Reps must be at least 1.").nullable(),
  targetWeight: z.number().min(0, "Weight cannot be negative."),
  targetRPE: z.number().min(1, "RPE 1–10.").max(10, "RPE 1–10."),
  notes: z.array(noteTranslationSchema).default([]),
});

export const exerciseBlockTemplateSchema = z.object({
  blockType: z.enum(["standard", "superset", "circuit"]),
  setTemplates: z.array(setTemplateSchema),
  exercises: z.array(
    z.object({
      guid: z.string(),
      name: z.string(),
    })
  ),
  notes: z.array(noteTranslationSchema).default([]),
});
