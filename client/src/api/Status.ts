import type { Response } from "../types/types"

export const fetchStatusSupabase = async (): Promise<Response> => {
	const res = await fetch('/api/status/supabase')
	return res.json()
}
