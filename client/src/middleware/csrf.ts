import type { Response } from "../types/types"

const fetchCSRFToken = async (): Promise<string> => {

	const res = await fetch('/api/auth/csrf');
	if (!res.ok) throw new Error("Error fetching CSRF token");

	const data: Response = await res.json();
	return data.message;

}

export const fetchCSRF = async (url: string, options: RequestInit = {}): Promise<globalThis.Response> => {

	const method = options.method || 'GET';

	if (method.toUpperCase() === 'GET') {
		return fetch(url, options);
	}

	const csrfToken = await fetchCSRFToken();

	const headers = {
		'Content-Type': 'application/json',
		'X-CSRF-Token': csrfToken,
		...options.headers
	}

	return fetch(url, {
		credentials: "include",
		...options,
		headers
	})

}
