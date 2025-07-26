import { Router } from 'express';
import { statusSupabase } from '../controllers/status';

const router = Router();

router.get('/status/supabase', statusSupabase);

export default router;
