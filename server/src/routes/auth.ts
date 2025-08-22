import { Router } from "express";
import { register, login, me, log_out, deleteUser } from "../controllers/auth";
import { generateCSRFToken, verifyCSRFToken } from "../middleware/csrf";
import {
	destroyJWTdata,
	extractJWTdata,
	verifyJWTtoken,
} from "../middleware/jwt";
import { dataFilter } from "../middleware/filter";

const router = Router();

router.get("/auth/csrf", generateCSRFToken);

router.post("/auth/register", verifyCSRFToken, dataFilter, register);
router.post("/auth/login", verifyCSRFToken, dataFilter, login);
router.post("/auth/me", verifyCSRFToken, verifyJWTtoken, me);
router.post(
	"/auth/logout",
	verifyCSRFToken,
	extractJWTdata,
	destroyJWTdata,
	log_out
);
router.post("/auth/delete_user", verifyCSRFToken, extractJWTdata, deleteUser);

export default router;
