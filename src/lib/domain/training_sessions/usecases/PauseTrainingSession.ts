import type { TrainingSessionRepository } from "$domain/training_sessions/repositories/TrainingSessionRepository";
import { EntityNotFoundError } from "$kernel/errors";
import type { UniqueId } from "$kernel/id";
import { TrainingSession } from "../entities/TrainingSession";

export class PauseTrainingSession {
  constructor(private repo: TrainingSessionRepository) { }

  async execute(session_id: UniqueId) {
    const session = await this.repo.get(session_id);

    if (!session) {
      throw new EntityNotFoundError(session_id, TrainingSession, {
        context: { useCase: "CompleteTrainingSession" }
      });
    }

    session.pause();

    await this.repo.save(session);

    return session;
  }
}