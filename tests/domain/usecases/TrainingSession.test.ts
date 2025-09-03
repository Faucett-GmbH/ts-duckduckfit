// tests/domain/TrainingSession.test.ts
import { describe, it, expect } from "vitest";
import { TrainingSession, TrainingSessionStatus } from "$domain/training_sessions/entities/TrainingSession";
import { ulidGenerator } from "$domain/core/identity";

let simpleId = ulidGenerator.generateUniqueId();

describe("TrainingSession lifecycle", () => {
  it("starts in ACTIVE state", () => {
    const session = new TrainingSession(simpleId, new Date());
    expect(session.status).toBe(TrainingSessionStatus.ACTIVE);
  });

  it("can be paused from ACTIVE", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.pause();
    expect(session.status).toBe(TrainingSessionStatus.PAUSED);
    expect(session.getPauseIntervals().length).toBe(1);
    expect(session.getPauseIntervals()[0].end).toBeUndefined();
  });

  it("throws if trying to pause when not ACTIVE", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.pause();
    expect(() => session.pause()).toThrow();
  });

  it("can resume from PAUSED", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.pause();
    session.resume();
    expect(session.status).toBe(TrainingSessionStatus.ACTIVE);
    expect(session.getPauseIntervals()[0].end).toBeInstanceOf(Date);
  });

  it("throws if trying to resume when not PAUSED", () => {
    const session = new TrainingSession(simpleId, new Date());
    expect(() => session.resume()).toThrow(/Can only resume a paused session/);
  });

  it("can be paused and resumed multiple times", () => {
    const session = new TrainingSession(simpleId, new Date());

    session.pause();
    session.resume();
    session.pause();
    session.resume();

    expect(session.getPauseIntervals().length).toBe(2);
    expect(session.getPauseIntervals()[0].end).toBeInstanceOf(Date);
    expect(session.getPauseIntervals()[1].end).toBeInstanceOf(Date);
  });

  it("can be completed from ACTIVE", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.complete();
    expect(session.status).toBe(TrainingSessionStatus.COMPLETED);
    expect(session.completed_at).toBeInstanceOf(Date);
  });

  it("can be completed from PAUSED (auto-resumes)", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.pause();
    session.complete();
    expect(session.status).toBe(TrainingSessionStatus.COMPLETED);
    expect(session.getPauseIntervals()[0].end).toBeInstanceOf(Date);
  });

  it("cannot complete twice", () => {
    const session = new TrainingSession(simpleId, new Date());
    session.complete();
    expect(() => session.complete()).toThrow();
  });
});

describe("TrainingSession time tracking", () => {
  it("computes elapsed active time correctly with pauses", () => {
    const start = new Date();
    const session = new TrainingSession(simpleId, start);

    // Simulate pause/resume cycle
    const pauseStart = new Date(start.getTime() + 1000); // +1s
    const pauseEnd = new Date(start.getTime() + 4000);   // +4s
    session.pause();
    // manually patch for deterministic test
    session.getPauseIntervals()[0].start = pauseStart;
    session.resume();
    session.getPauseIntervals()[0].end = pauseEnd;

    const end = new Date(start.getTime() + 6000); // +6s
    session.complete();
    session.completed_at = end;

    const totalPaused = session.getTotalPausedMs();
    const elapsed = session.getElapsedMs();

    expect(totalPaused).toBe(3000); // 3s pause
    expect(elapsed).toBe(3000);     // 6s total - 3s pause
  });
});
