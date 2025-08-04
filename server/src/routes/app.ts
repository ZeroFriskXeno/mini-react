import { Router } from 'express';
import { verifyCSRFToken } from '../middleware/csrf';
import { extractJWTdata, verifyJWTtoken } from '../middleware/jwt';
import { new_post } from '../controllers/post';

const router = Router();

// router.get('/app/get_post', get_post)
router.post('/app/new_post', verifyCSRFToken, verifyJWTtoken, extractJWTdata, new_post)
// router.post('/app/like_post', verifyCSRFToken, verifyJWTToken, like_post)
// router.post('/app/report_post', verifyCSRFToken, verifyJWTToken, report_post)

export default router;
