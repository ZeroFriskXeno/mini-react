import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const tokenStore = new Map<string, string>();

export const generateCSRFToken = (req: Request, res: Response) => {

	const csrfData = crypto.randomBytes(32).toString("hex");
	const clientID = req.ip || "random";

	const originPage = req.headers['origin-page'] as string;

	tokenStore.set(clientID, csrfData);

	res.json( { ok: true, message: csrfData } );

	console.log(`[CSRF] CREATE: ${clientID} => ${tokenStore.get(clientID)} | ORIGIN__: ${originPage}`);

};

export const verifyCSRFToken = (req: Request, res: Response, next: NextFunction) => {

    const tokenFromHeader = req.headers['csrf-token'] as string;
    const tokenFromBody = req.body.csrf_token;

    const originPage = req.headers['origin-page'] as string;

    const clientToken = tokenFromHeader || tokenFromBody;
    const clientID = req.ip || "random";
    if (!clientToken) return res.status(403).json({ ok: false, message: "CSRF token missing" });

    const serverToken = tokenStore.get(clientID);
    if (!serverToken) return res.status(403).json({ ok: false, message: "CSRF token expired or invalid" });

	const tokenCheck = !crypto.timingSafeEqual(Buffer.from(clientToken), Buffer.from(serverToken));
    if (tokenCheck) return res.status(403).json({ ok: false, message: `Invalid CSRF token` });

	console.log(`[CSRF] VERIFY: ${clientID} => ${serverToken} | ENDPOINT: ${originPage} => ${!tokenCheck} `);

	tokenStore.set(clientID, "");

    next();

};
