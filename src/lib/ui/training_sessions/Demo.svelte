<script lang="ts">
	import { StartTrainingSession } from '$domain/training_sessions/usecases/StartTrainingSession';
	import { PauseTrainingSession } from '$domain/training_sessions/usecases/PauseTrainingSession';
	import { ResumeTrainingSession } from '$domain/training_sessions/usecases/ResumeTrainingSession';
	import { CompleteTrainingSession } from '$domain/training_sessions/usecases/CompleteTrainingSession';
	import {
		TrainingSession,
		TrainingSessionStatus
	} from '$domain/training_sessions/entities/TrainingSession';
	import { InMemoryTrainingSessionRepository } from '$lib/infrastructure/in_memory/InMemoryTrainingSessionRepository';
	import { ulidGenerator } from '$domain/core/identity';

	const repo = new InMemoryTrainingSessionRepository();
	const startUC = new StartTrainingSession(repo, ulidGenerator);
	const pauseUC = new PauseTrainingSession(repo);
	const resumeUC = new ResumeTrainingSession(repo);
	const completeUC = new CompleteTrainingSession(repo);

	let session: TrainingSession | null = $state(null);

	let status: string = $state('');

	function update(session: TrainingSession) {
		status = session.status;
	}

	async function start() {
		session = await startUC.execute();
		update(session);
	}
	async function pause() {
		session = await pauseUC.execute(session.id);
		update(session);
	}
	async function resume() {
		session = await resumeUC.execute(session.id);
		update(session);
	}
	async function complete() {
		session = await completeUC.execute(session.id);
		update(session);
	}

	function formatMs(ms: number) {
		const s = Math.floor(ms / 1000) % 60;
		const m = Math.floor(ms / 60000) % 60;
		const h = Math.floor(ms / 3600000);
		return `${h}h ${m}m ${s}s`;
	}
</script>

<div class="mx-auto my-6 w-[600px]">
	{#if status == ''}
		<button onclick={start} class="rounded bg-blue-600 p-2 text-white">
			Start Training Session
		</button>
	{:else}
		<h2>Session {session.id}</h2>
		<p>Status: {session.status}</p>
		<p>Started at: {session.started_at}</p>

		{#if status !== TrainingSessionStatus.COMPLETED}
			<p>Active time: {formatMs(session.getElapsedMs())}</p>
			<ul>
				{#each session.getPauseIntervals() as p, i}
					<li>
						Pause {i + 1}: {p.start.toLocaleTimeString()} → {p.end
							? p.end.toLocaleTimeString()
							: '…'}
					</li>
				{/each}
			</ul>
		{/if}

		{#if status === TrainingSessionStatus.ACTIVE}
			<button onclick={pause} class="rounded bg-yellow-500 p-2 text-white">Pause</button>
			<button onclick={complete} class="rounded bg-gray-700 p-2 text-white">Finish</button>
		{:else if status === TrainingSessionStatus.PAUSED}
			<button onclick={resume} class="rounded bg-green-600 p-2 text-white">Resume</button>
		{:else}
			<p>Completed at: {session.completed_at}</p>
			<p>Total Pause time: {formatMs(session.getTotalPausedMs())}</p>
			<p>Total active time: {formatMs(session.getElapsedMs())}</p>
		{/if}
	{/if}
</div>
