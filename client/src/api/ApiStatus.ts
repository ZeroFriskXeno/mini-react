import type { Response } from "../types/types"

export const fetchStatusSupabase = async (): Promise<Response> => {
	const res = await fetch('/api/status/supabase')
	if (!res.ok) throw new Error("Error on fetching status")
	return res.json()
}
