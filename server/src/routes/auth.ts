import { Router } from 'express';
import { register } from '../controllers/auth';
import { generateCSRFToken, verifyCSRFToken } from '../middleware/csrf';

const router = Router();

router.get('/auth/csrf', generateCSRFToken);
router.post('/auth/register', verifyCSRFToken, register);

export default router;
