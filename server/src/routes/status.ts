import { Router } from 'express'
import { getStatusSupabase } from '../controllers/status'

const router = Router()

router.get('/status/supabase', getStatusSupabase)

export default router
