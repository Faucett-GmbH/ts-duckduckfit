import { env } from '$env/dynamic/public';
import { building } from '$app/environment';
import {
	Configuration,
	ExercisesApi,
	type ConfigurationParameters
} from './exdb';
import { PUBLIC_EXDB_URL } from '$env/static/public';

const configurationParameters: ConfigurationParameters = {
	middleware: [
		{
			pre: async (context) => ({ ...context, init: { ...context.init, mode: 'cors' } })
		}
	],
	credentials: 'same-origin',
	get basePath() {
		if (building) {
			return PUBLIC_EXDB_URL;
		}
		return env.PUBLIC_EXDB_URL;
	}
};

export const configuration = new Configuration(configurationParameters);

export const exerciseApi = new ExercisesApi(configuration);