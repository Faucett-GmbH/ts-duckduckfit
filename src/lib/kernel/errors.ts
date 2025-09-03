import type { UniqueId } from "./id";

export class BaseError extends Error {
  public readonly cause?: unknown;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, options?: { cause?: unknown; context?: Record<string, unknown> }) {
    super(message);

    this.name = new.target.name; // class name as error name
    this.cause = options?.cause;
    this.context = options?.context;

    Object.setPrototypeOf(this, new.target.prototype); // fix prototype chain
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      cause: this.cause instanceof Error ? this.cause.message : this.cause,
      stack: this.stack,
    };
  }
}


export class EntityNotFoundError extends BaseError {
  public readonly id: string | number;
  public readonly entityName: string;

  constructor(
    id: string | number,
    entityClass: Function | string,
    options?: { cause?: unknown; context?: Record<string, unknown> }
  ) {
    const name = typeof entityClass === "string" ? entityClass : entityClass.name;
    super(`${name} with id ${id} not found`, options);

    this.id = id;
    this.entityName = name;
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      id: this.id,
      entity: this.entityName,
    };
  }
}
