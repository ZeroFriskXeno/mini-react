import { Router } from 'express';
import { verifyCSRFToken } from '../middleware/csrf';
import { extractJWTdata, verifyJWTtoken } from '../middleware/jwt';
import { get_post_likes, new_post } from '../controllers/post';

const router = Router();

router.get('/app/get_post/likes', get_post_likes);
// router.get('/app/get_post/new', get_post_new);
// router.get('/app/get_post/trend', get_post_trend);
// router.get('/app/get_post/you', get_post_you);
router.post('/app/new_post', verifyCSRFToken, verifyJWTtoken, extractJWTdata, new_post);
// router.post('/app/like_post', verifyCSRFToken, verifyJWTToken, like_post);
// router.post('/app/report_post', verifyCSRFToken, verifyJWTToken, report_post);

export default router;
