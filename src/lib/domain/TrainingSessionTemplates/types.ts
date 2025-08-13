import type { Locale } from "$lib/paraglide/runtime";

// stubs for now
type Exercise = {}

export type SetType = "warm_up" | "working_set";

export type ExerciseBlockType = "standard" | "superset" | "circuit";

export type TrainingSessionTemplate = {
  name: string;
  description: string;
  exerciseBlockTemplates: ExerciseBlockTemplate;
  createdAt: Date;
  updatedAt:
}

interface NoteTranslation {
  locale: Locale
  value: string | null
}

export type ExerciseBlockTemplate = {
  blockType: ExerciseBlockType;
  setTemplates: SetTemplate[];
  exercises: Exercise[];
  notes: NoteTranslation[];
}


export type SetTemplate = {
  exerciseGuid: string;
  position: number
  setType: SetType
  targetReps: number | null
  targetWeight: number
  targetRPE: number

  notes: NoteTranslation[];
}