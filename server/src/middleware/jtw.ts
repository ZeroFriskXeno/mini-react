import { sign } from "jsonwebtoken";
import { env } from '../util/env';

const JWT_SECRET = env.JWT_SECRET;

export const generateJWTToken = (user: any,) => {

	const token = sign(
		{ id: user.id, username: user.username },
		JWT_SECRET!,
		{ expiresIn: "10m" }
	)

	return token ;

};
