import type { AuthData, Response } from "../types/types"
import { fetchCSRF } from "../middleware/csrf"

export const fetchLogin = async (userData: AuthData): Promise<Response> => {

	const res = await fetchCSRF('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return res.json()

}
