import type { TrainingSessionRepository } from "$domain/training_sessions/repositories/TrainingSessionRepository";
import { TrainingSession } from "$domain/training_sessions/entities/TrainingSession";
import type { UniqueId } from "$kernel/id";

export class InMemoryTrainingSessionRepository implements TrainingSessionRepository {
  private store: Map<string, TrainingSession> = new Map();

  async list(): Promise<TrainingSession[]> {
    return Array.from(this.store.values());
  }

  async save(entity: TrainingSession): Promise<void> {
    this.store.set(entity.id, entity);
  }

  async get(id: UniqueId): Promise<TrainingSession | null> {
    return this.store.get(id) ?? null;
  }

  async delete(id: UniqueId): Promise<boolean> {
    return this.store.delete(id);
  }
}