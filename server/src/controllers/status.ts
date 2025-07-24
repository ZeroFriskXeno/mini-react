import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// ? if supabase reply then both works
// export const getStatusLocal = (_req: Request, res: Response) => {
// 	res.json({ ok: true, message: 'Server working' })
// }

export const getStatusSupabase = async (_req: Request, res: Response) => {

	try {
		const { error } = await supabase.from('test').select().limit(1)
		if (error) throw error
		res.json({ ok: true, message: 'Supabase connected' })
	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  })
	}

}
