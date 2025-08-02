import { sign, verify } from "jsonwebtoken";
import { env } from '../util/env';
import { Request, Response, NextFunction } from "express"

const JWT_SECRET = env.JWT_SECRET;

export const generateJWTToken = (user: any) => {

	const token = sign(
		{ id: user.id, username: user.username },
		JWT_SECRET!,
		{ expiresIn: "10m" }
	)

	console.log(`CREATE: COOKIE => ${token}`);

	return token ;

};

export const verifyJWTtoken = (req: Request, res: Response, next: NextFunction ) => {

	const tokenJWT = req.cookies?.token;
	if (!tokenJWT) return res.status(401).json({ok: false, message: "User isn't logged!"});

	try {
		const decode = verify(tokenJWT, JWT_SECRET!);
		console.log(`VERIFY: COOKIE => ${tokenJWT} => true `);
		next()
	} catch (e) {
		return res.status(401).json({ ok: false, message: (e as Error).message })
	}

}
