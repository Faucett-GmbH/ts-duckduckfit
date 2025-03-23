export const USER_VERSION = 1;

export interface UserWeight {
  weightInKg: number;
  createdAt: Date;
}

export interface User {
  version: number;
  birthdate: Date | null;
  weightUnit: 'kg' | 'lbs' | null;
  distanceUnits: 'km' | 'mi' | null;
  bodyMeasurementUnit: 'cm' | 'in' | null;
  heightInCm: number | null;
  weights: UserWeight[];
}

export const userMigrations = {
  1: (user: User) => {
    user.version = 1;
    user.weights = [];
  }
};
