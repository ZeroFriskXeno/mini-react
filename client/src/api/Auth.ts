import type { UserData, ResponseData } from "../types/types";
import { fetchCSRF } from "../middleware/csrf";

export const fetchRegister = async (userData: UserData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json();

}

export const fetchLogin = async (userData: UserData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json();

}

export const fetchMe = async (): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/me', {
		method: 'POST',
		body: JSON.stringify({})
	})

	return res.json();

}

