import type { AuthData, Response } from "../types/types"
import { fetchCSRF } from "../middleware/csrf"

export const fetchRegister = async (userData: AuthData): Promise<Response> => {

	const res = await fetchCSRF('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json()

}
