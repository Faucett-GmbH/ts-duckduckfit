export interface UserWeightMeasurement {
  weight: number;
  measuredAt: Date;
}

export interface UserAnthropometry {
  height: number | null;
}

export type Sex = "male" | "female";

export interface UserInformation {
  fullName: string | null;
  bio: string | null;
  birthdate: Date | null;
  sex: Sex;
}

export interface User {
  version: number;
  username: string | null;
  info: UserInformation;
  anthropometry: UserAnthropometry;
  bodyWeightMeasurements: UserWeightMeasurement[];
}

export const userMigrations = {
  1: async () => (user: User) => {
    user.version = 1;
    user.username = null;
    user.info = {
      birthdate: null,
      fullName: null,
      bio: null,
      sex: "male",
    };
    user.anthropometry = {
      height: null
    };
    user.bodyWeightMeasurements = [];
  }
};
