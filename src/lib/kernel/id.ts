import type { ULID } from "ulid";

export type UniqueId = string & { readonly __brand: unique symbol };

export interface IdGen {
  generateUniqueId(): UniqueId
}

export function toUniqueId(id: string): UniqueId {
  return id as UniqueId;
}

export class IdGenerator implements IdGen {
  constructor(private readonly generator: () => string) { }

  generateUniqueId(): UniqueId {
    return toUniqueId(this.generator())
  }
}