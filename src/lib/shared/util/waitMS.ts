export function waitMS(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
