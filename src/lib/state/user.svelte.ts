export interface UserWeightMeasurement {
  weight: number;
  measuredAt: Date;
}

export type MeasurementSystem = "metric" | "imperial";

export interface UserInformation {
  fullName: string | null;
  bio: string | null;
  birthdate: Date | null;
  height: number | null;
  measurementSystem: MeasurementSystem;
}

export interface User {
  version: number;
  username: string;
  info: UserInformation;
  weightUnit: 'kg' | 'lbs' | null;
  distanceUnits: 'km' | 'mi' | null;
  bodyMeasurementUnit: 'cm' | 'in' | null;
  heightInCm: number | null;
  bodyWeightMeasurements: UserWeightMeasurement[];
}

export const userMigrations = {
  1: async () => (user: User) => {
    user.version = 1;
    user.info = {
      birthdate: null,
      fullName: null,
      bio: null,
      measurementSystem: "metric",
      height: null
    };
    user.bodyWeightMeasurements = [];
  }
};
