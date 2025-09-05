export function getId<T extends { id: unknown }>(object: T): T['id'] {
	return object.id;
}
