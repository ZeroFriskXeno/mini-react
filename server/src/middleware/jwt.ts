import { sign, verify,  } from "jsonwebtoken";
import { env } from '../util/env';
import { Request, Response, NextFunction } from "express"

interface RequestUserData {
	id: string,
	username: string
}

const JWT_SECRET = env.JWT_SECRET;

export const generateJWTToken = (user: any) => {

	const JWTtoken = sign(
		{ id: user.id, username: user.username },
		JWT_SECRET!,
		{ expiresIn: "1h" }
	)

	console.log(`[JWT_] CREATE: => ${JWTtoken.slice(0, 61).concat("...")}`);

	return JWTtoken ;

};

export const verifyJWTtoken = ( req: Request, res: Response, next: NextFunction ) => {

	const JWTtoken = req.cookies?.token;
	if (!JWTtoken) return res.status(401).json({ok: false, message: "First you have to log in!"});

	try {
		const decode = verify(JWTtoken, JWT_SECRET!);
		console.log(`[JWT_] VERIFY: => ${JWTtoken.slice(0, 61).concat("...")} => true `);
		next()
	} catch (e) {
		return res.status(401).json({ ok: false, message: (e as Error).message })
	}

}

export const extractJWTdata = ( req: Request, res: Response, next: NextFunction ) => {

	const JWTtoken = req.cookies?.token;
	if (!JWTtoken) return res.status(401).json({ok: false, message: "User isn't logged!" })

	const data =  verify(JWTtoken, JWT_SECRET!) as RequestUserData;
	if( typeof data !== "object" || !("id" in data) ) throw new Error("Invalid token!");

	console.log(`[JWT_] EXTRCT: => ${JSON.stringify(data)} `);

	req.body = {
		...req.body,
		...data
	};

	next();

}

export const destroyJWTdata = ( req: Request, res: Response, next: NextFunction ) => {

	const JWTtoken = req.cookies?.token;
	if (!JWTtoken) return res.status(401).json({ok: false, message: "Missing cookie data" })

	res.clearCookie("token");

	console.log(`[JWT_] DESTRY: => ${JWTtoken.slice(0, 61).concat("...")}`);

	next();

}
