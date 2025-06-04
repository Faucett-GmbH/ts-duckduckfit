export const prerender = true;

export async function GET() {
	return new Response(null, { status: 204 });
}
