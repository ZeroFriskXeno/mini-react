import { Router } from 'express';
import { verifyCSRFToken } from '../middleware/csrf';
import { extractJWTdata, verifyJWTtoken } from '../middleware/jwt';
import { get_post_likes, get_post_new, get_post_random, get_post_trend, post_like, post_new } from '../controllers/app';

const router = Router();

router.get('/app/get_post/likes', get_post_likes);
router.get('/app/get_post/new', get_post_new);
router.get('/app/get_post/trend', get_post_trend);
router.get('/app/get_post/random', get_post_random);

router.post('/app/post/new', verifyCSRFToken, verifyJWTtoken, extractJWTdata, post_new);
router.post('/app/post/like', verifyCSRFToken, verifyJWTtoken, extractJWTdata, post_like);
// router.post('/app/report_post', verifyCSRFToken, verifyJWTtoken, report_post);

export default router;
