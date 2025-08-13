import { useState } from 'react';

import type { UserData, ResponseData } from "../types/types";

import { fetchPostRegister, fetchPostLogin, fetchPostMe, fetchLogout } from "../api/Auth";
import { useGlobalStore } from '../store/globalStore';

export const useAuth = () => {

	const { setError, setSuccess } = useGlobalStore();

	const [logged, setLogged] = useState(false);

	const handleRegister = async (userData: UserData): Promise<ResponseData> => {

		try {

			const result = await fetchPostRegister(userData);
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

			const result = await fetchPostLogin(userData);

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

			const result = await fetchPostMe();

			if (result.ok) setLogged(true);
		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handleLogout = async () => {

		try {

			const result = await fetchLogout();

			if (result.ok) {
				setSuccess(result.message);
				setLogged(false);
			} else setError(result.message);

			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	return {
		logged,
		setError, setSuccess, setLogged,
		handleRegister, handleLogin, handleMe, handleLogout
	};

};