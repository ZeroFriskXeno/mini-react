export function sanitizeInput(input: string): string {
	return input
		.trim()
		.replace(/<[^>]*>?/gm, "")
		.replace(/[^\w\s.,!?@_-]/g, "");
}
