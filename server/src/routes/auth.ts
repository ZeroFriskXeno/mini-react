import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { generateCSRFToken, verifyCSRFToken } from '../middleware/csrf';

const router = Router();

router.get('/auth/csrf', generateCSRFToken);
router.post('/auth/register', verifyCSRFToken, register);
router.post('/auth/login', verifyCSRFToken, login);

export default router;
