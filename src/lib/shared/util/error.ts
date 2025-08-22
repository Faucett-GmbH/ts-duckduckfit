import { m } from '$lib/paraglide/messages';
import { createNotification } from '../state/notifications.svelte';

export type Messages = typeof m;
export type MessageKey = keyof Messages;
export type MessageParameters<M extends Extract<MessageKey, string>> = Parameters<Messages[M]>;

export class InternalError extends Error {
	static from<C extends MessageKey, M extends MessageKey>(
		code: C,
		message: M,
		...parameters: MessageParameters<M>
	) {
		return new InternalError(getError(code, message, parameters));
	}
}

export function getError<C extends MessageKey, M extends MessageKey>(
	code: C,
	message: M,
	parameters: MessageParameters<M>
) {
	// @ts-expect-error must do
	const name = m[code]();
	// @ts-expect-error must do
	const body = m[message](...parameters);
	return `${name}: ${body}`;
}

export function handleError(error: unknown) {
	if (error instanceof InternalError) {
		createNotification(error.message);
		return;
	}
	console.error(error);
	createNotification(`${m.errors_name_application()}: ${m.errors_message_application()}`);
}
