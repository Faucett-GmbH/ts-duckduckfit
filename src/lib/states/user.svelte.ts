export const USER_VERSION = 1;

export interface UserWeight {
  weight: number;
  date: Date;
}

export interface User {
  version: number;
  birthdate: Date | null;
  weights: UserWeight[];
}

export const userMigrations = {
  1: (user: User) => {
    user.version = 1;
    user.weights = [];
  }
};
