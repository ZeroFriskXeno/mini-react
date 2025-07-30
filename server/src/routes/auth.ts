import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { generateCSRFToken, verifyCSRFToken } from '../middleware/csrf';

const router = Router();

router.get('/auth/csrf', generateCSRFToken);

router.post('/auth/register', verifyCSRFToken, register);
router.post('/auth/login', verifyCSRFToken, login);

// router.get('/app/get_post', get_post)
// router.post('/app/new_post', verifyCSRFToken, verifyJWTToken, new_post)
// router.post('/app/like_post', verifyCSRFToken, verifyJWTToken, like_post)
// router.post('/app/report_post', verifyCSRFToken, verifyJWTToken, report_post)

export default router;
