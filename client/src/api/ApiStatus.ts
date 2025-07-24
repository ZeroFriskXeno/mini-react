export interface StatusResponse {
	ok: boolean
	message: string
}

export const fetchStatusSupabase = async (): Promise<StatusResponse> => {
	const res = await fetch('/api/status/supabase')
	if (!res.ok) throw new Error("Error on fetching status")
	return res.json()
}
