import { Router } from "express";
import { verifyCSRFToken } from "../middleware/csrf";
import { extractJWTdata, verifyJWTtoken } from "../middleware/jwt";
import {
	get_post_likes,
	get_post_new,
	get_post_random,
	get_post_trend,
	post_like,
	post_new,
	post_report,
} from "../controllers/app";
import { dataFilter } from "../middleware/filter";

const router = Router();

router.get("/app/get_post/likes", get_post_likes);
router.get("/app/get_post/new", get_post_new);
router.get("/app/get_post/trend", get_post_trend);
router.get("/app/get_post/random", get_post_random);

router.post("/app/post/new", verifyCSRFToken, dataFilter, extractJWTdata, post_new);
router.post("/app/post/like", verifyCSRFToken, dataFilter, extractJWTdata, post_like);
router.post("/app/post/report", verifyCSRFToken, dataFilter, extractJWTdata, post_report);

export default router;
