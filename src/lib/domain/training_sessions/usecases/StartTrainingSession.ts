import { TrainingSession } from "$domain/training_sessions/entities/TrainingSession";
import type { TrainingSessionRepository } from "$domain/training_sessions/repositories/TrainingSessionRepository";
import type { IdGen } from "$kernel/id";

export class StartTrainingSession {
  constructor(
    private repo: TrainingSessionRepository,
    private id_gen: IdGen
  ) { }

  async execute() {
    const session = new TrainingSession(this.id_gen.generateUniqueId(), new Date());
    await this.repo.save(session);
    return session;
  }
}