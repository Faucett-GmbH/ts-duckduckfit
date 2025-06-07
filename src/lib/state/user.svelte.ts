export interface UserWeight {
  weight: number;
  measuredAt: Date;
}

export interface UserInformation {
  birthdate: Date | null;
  sex: "male" | "female" | null;
  height: number | null;
}

export interface User {
  version: number;
  info: UserInformation;
  measurementSystem: 'metric' | 'imperial' | null;
}

export const userMigrations = {
  1: async () => (user: User) => {
    user.version = 1;
    user.info = {
      birthdate: null,
      sex: null,
      height: null,
    };
    user.measurementSystem = 'metric';
  }
};
