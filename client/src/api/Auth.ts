import type { UserData, ResponseData } from "../types/types";
import { fetchCSRF } from "../middleware/csrf";

export const fetchPostRegister = async (userData: UserData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json();

}

export const fetchPostLogin = async (userData: UserData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json();

}

export const fetchPostMe = async (): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/me', {
		method: 'POST',
		body: JSON.stringify({})
	})

	return res.json();

}

export const fetchLogout = async (): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/logout', {
		method: 'POST',
		body: JSON.stringify({})
	})

	return res.json();

}

export const fetchDeleteUser = async (userData: UserData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/auth/delete_user', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json();

}
