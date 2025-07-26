import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const tokenStore = new Map<string, string>();

export const generateCSRFToken = (req: Request, res: Response) => {

	const csrfData = crypto.randomBytes(32).toString("hex");
	const clientID = req.ip || crypto.randomBytes(4).toString("hex");

	tokenStore.set(clientID, csrfData);

	res.cookie(
		"csrf_token", tokenStore, {httpOnly: true, sameSite: "strict"}
	).json(
		{ ok: true, message: csrfData }
	);

	console.log(tokenStore.get(clientID))

};

export const verifyCSRFToken = (req: Request, res: Response, next: NextFunction) => {

    const tokenFromHeader = req.headers['x-csrf-token'] as string;
    const tokenFromBody = req.body.csrf_token;

    const clientToken = tokenFromHeader || tokenFromBody;
    const clientID = req.ip || crypto.randomBytes(4).toString("hex");

    if (!clientToken) {
        return res.status(403).json({
            ok: false,
            message: "CSRF token missing"
        });
    }

    const serverToken = tokenStore.get(clientID);

    if (!serverToken) {
        return res.status(403).json({
            ok: false,
            message: "CSRF token expired or invalid"
        });
    }

    if (!crypto.timingSafeEqual(Buffer.from(clientToken), Buffer.from(serverToken))) {
        return res.status(403).json({
            ok: false,
            message: "Invalid CSRF token"
        });
    }

    next();

};

// TODO get verification
