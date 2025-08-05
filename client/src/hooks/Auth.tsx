import { useState } from 'react';

import type { UserData, ResponseData } from "../types/types";

import { fetchRegister, fetchLogin, fetchMe } from "../api/Auth";
import { useGlobalStore } from '../store/globalStore';

export const useAuth = () => {

	const { setError, setSuccess } = useGlobalStore();

	const [logged, setLogged] = useState(false);

	const handleRegister = async (userData: UserData): Promise<ResponseData> => {

		try {

			const result = await fetchRegister(userData);
			if (result.ok) setSuccess(result.message);
			else setError(result.message);
			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handleLogin = async (userData: UserData): Promise<ResponseData> => {

		try {

			const result = await fetchLogin(userData);

			if (result.ok) {
				setSuccess(result.message);
				setLogged(true);
			} else setError(result.message);

			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handleMe = async () => {

		try {

			const result = await fetchMe();

			if (result.ok) setLogged(true);
		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	return {
		logged,
		setError, setSuccess, setLogged,
		handleRegister, handleLogin, handleMe
	};

};