export function getGuid<T extends { guid: unknown }>(object: T): T['guid'] {
	return object.guid;
}
