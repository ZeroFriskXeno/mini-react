import type { ResponseData } from "../types/types"

export const fetchStatusSupabase = async (): Promise<ResponseData> => {
	const res = await fetch('/api/status/supabase')
	return res.json()
}
