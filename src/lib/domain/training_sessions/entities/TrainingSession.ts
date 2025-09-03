import type { UniqueId } from "$lib/kernel/id";
import { TrainingSessionStatusError } from "../errors";

export type PauseInterval = {
  start: Date;
  end?: Date;
}

export enum TrainingSessionStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
}

export class TrainingSession {
  private pause_intervals: PauseInterval[] = [];
  constructor(
    public readonly id: UniqueId,
    public readonly started_at: Date,
    public status: TrainingSessionStatus = TrainingSessionStatus.ACTIVE,
    public completed_at?: Date
  ) { }

  pause() {
    if (this.status !== TrainingSessionStatus.ACTIVE) {
      throw new TrainingSessionStatusError("Can only pause an active session", {
        context: { method: 'pause' }
      });
    }
    this.status = TrainingSessionStatus.PAUSED;
    this.pause_intervals.push({ start: new Date() });
  }

  resume() {
    if (this.status !== TrainingSessionStatus.PAUSED) {
      throw new TrainingSessionStatusError("Can only resume a paused session", {
        context: { method: 'resume' }
      });
    }
    this.status = TrainingSessionStatus.ACTIVE;

    const current = this.pause_intervals.at(-1);

    if (!current || current.end) {
      throw new TrainingSessionStatusError("No open pause interval to resume", {
        context: { method: 'resume' }
      });
    }
    current.end = new Date();
  }

  complete() {
    if (this.status === TrainingSessionStatus.COMPLETED) {
      throw new Error("Session is already completed");
    }
    if (this.status === TrainingSessionStatus.PAUSED) {
      // Close last pause interval
      this.resume();
    }
    this.status = TrainingSessionStatus.COMPLETED;
    this.completed_at = new Date();
  }

  getPauseIntervals() {
    return this.pause_intervals;
  }

  getTotalPausedMs(): number {
    return this.pause_intervals.reduce((sum, p) => {
      const end = p.end ?? new Date();
      return sum + (end.getTime() - p.start.getTime());
    }, 0);
  }

  getElapsedMs(): number {
    const end = this.completed_at ?? new Date();
    return (end.getTime() - this.started_at.getTime()) - this.getTotalPausedMs();
  }
}