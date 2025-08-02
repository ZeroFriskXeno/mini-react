import type { Response } from "../types/types"

const fetchCSRFToken = async (url: string, options: RequestInit = {}): Promise<string> => {

	const headers = {
		'Origin-Page': url,
		...options.headers
	}

	const res = await fetch('/api/auth/csrf', {headers});
	if (!res.ok) throw new Error("Error fetching CSRF token");

	const data: Response = await res.json();
	return data.message;

}

export const fetchCSRF = async (url: string, options: RequestInit = {}): Promise<globalThis.Response> => {

	const method = options.method || 'GET';

	if (method.toUpperCase() === 'GET') {
		return fetch(url, options);
	}

	const csrfToken = await fetchCSRFToken(url);

	const headers = {
		'Content-Type': 'application/json',
		'CSRF-Token': csrfToken,
		'Origin-Page': url,
		...options.headers
	}

	return fetch(url, {
		credentials: "include",
		...options,
		headers
	})

}
