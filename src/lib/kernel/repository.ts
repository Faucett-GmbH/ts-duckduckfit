import type { UniqueId } from "./id";

export interface Repository<T> {
  // collections
  list(): Promise<T[]>;

  // members
  get(id: UniqueId): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(id: UniqueId): Promise<boolean>;
}