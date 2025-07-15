# DuckDuckFit Documentation

## 1. Concepts

### `Workout Program`

A workout program consists of a workout schedule, for example, monday, wednesday and friday and a collection of workout templates - for each workout, for instance, squats, bench press and deadlift on mondays and fridays and lunges and overhead presses on wednesdays.

A workout program also consists of variables such as 1 rep max on an exercise used in the program such as bench press.

### `Workout Schedule`

A workout schedule can be weekly based i.e. assign a workout template to be done on a specific day. Bench Workout on Mondays, and Squat Workout on Thursdays for instance.

### `Workout Session Template`

This is a template that is then followed when carrying out an actual workout session.

### `Set Series Template`

A `SetSeriesTemplate` is an ordered series of sets.

In the simplest case it could be one exercise `Bench Press` with 3 sets for 5 reps.

It could also be a long circuit in a crossfit style, consisting of `Cleans` followed by `Push Press` and `Box Jumps` each exercise performed directly after the other, followed by two minutes of rest before repeated for a total of 4 rounds.

### `Workout Session`

The training session performed on the basis of a workout session template. It stores the actual sets, reps and exercises you did along with any notes you made.

## Type Specifications

```typescript
type SetTypes =
	| 'warm_up' // set performed purely to prepare for future sets
	| 'working_set'; // regular set

type SetSeriesTypes = 'standard' | 'superset' | 'circuit';

type Ranking1_10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type LocaleString = 'en' | 'de' | 'es';

type Exercise = {
	guid: UUID;
	uri: string;
	image_url: string | null;
	thumbnail_image_url: string | null;
	translations: ExerciseTranslation[];
};

type ExerciseTranslation = {
	guid: UUID;
	locale: LocaleString;

	// naming
	uri: string;
	name: str;
	alternative_names: string[];

	// metadata
	metadata_keywords: string[];
	metadata_authors: string[];

	// information (text content is in markdown)
	video_url: string | null;
	description: string;
	summary: string;
	instructions: string;
	tips: string[];
};

type WorkoutSessionTemplate = {
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
};

type SetSeriesTemplate = {
	name: string | null;

	// rest config for all sets in the series
	rest_after_set_in_seconds: number;
	series_type: SetSeriesType;
	set_templates: SetTemplate[];
};

type SetTemplate = {
	exercise_id: UUID;

	// where was this set performed in a series of sets in the workout?
	position: number;
	set_type: SetTypes;

	// Exact reps
	reps: number;

	// how much weight?
	weight: float;

	notes: string | null; // coaching tips, custom cues, technical reminders

	// how long to rest after the set was finished.
	// overrides the rest setting on the SetSeries if it has been set.
	rest_after_set_in_seconds: number;
};

type Set = {
	set_template_id: UUID;
	position: number;
	set_type: SetTypes;
	reps: number;
	weight: float;
	notes: string | null;
	rest_after_set_in_seconds: number;

	// measuring perceived effort (rpe = rate of perceived exertion, rir = reps in reserve)
	// rpe = 10 - rir
	rpe: Ranking1_10;
	rir: Ranking1_10;
};

type SetSeries = {
	set_series_template_id: UUID;
	sets: Set[];
};

type WorkoutSession = {
	workout_session_template_id: UUID;

	started_at: Date;
	completed_at: Date;
	completed: boolean;

	set_series: SetSeries[];
};
```
