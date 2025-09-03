
import { TrainingSession } from "$domain/training_sessions/entities/TrainingSession";
import type { Repository } from "$kernel/repository";

export interface TrainingSessionRepository extends Repository<TrainingSession> { }
