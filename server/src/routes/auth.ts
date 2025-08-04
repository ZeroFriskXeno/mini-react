import { Router } from 'express';
import { register, login, me } from '../controllers/auth';
import { generateCSRFToken, verifyCSRFToken } from '../middleware/csrf';
import { verifyJWTtoken } from '../middleware/jwt';

const router = Router();

router.get('/auth/csrf', generateCSRFToken);

router.post('/auth/register', verifyCSRFToken, register);
router.post('/auth/login', verifyCSRFToken, login);
router.post('/auth/me', verifyCSRFToken, verifyJWTtoken, me)

export default router;
