import * as argon2 from "argon2";
import { Request, Response } from "express";
import { supabase } from "../supabase/client";
import { generateJWTToken } from "../middleware/jwt";

export const register = async (req: Request, res: Response) => {

	try {

		const { username, password: passwordBody } = req.body;
		if ( !username || !passwordBody )
			return res.status(400).json({ ok: false, message: "Missing register data" });

		const password = await argon2.hash(passwordBody);

		const { data, error } = await supabase
			.from('users')
			.insert([{ username, password, status: 0  }])
			.select();
		if (error)
			return res.status(500).json({ ok: false, message: error.message });

		console.log("New user register");

		res.status(201).json({ok: true, message: "User created!"});

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}

}

export const login = async (req: Request, res: Response) => {
	try {

		const { username, password: passwordBody } = req.body;
		if (!username || !passwordBody)
			return res.status(400).json({ ok: false, message: "Missing login data" });

		const { data, error } = await supabase
			.from('users')
			.select("*")
			.eq("username", username);

		if (error || !data || data.length === 0)
			return res.status(401).json({ ok: false, message: "Invalid credentials!" });

		const user = data[0];

		const isMatch = await argon2.verify(user.password, passwordBody);
		if (!isMatch)
			return res.status(401).json({ ok: false, message: "Invalid credentials!" });

		if (user.status == 1)
			return res.status(403).json({ ok: false, message: "User is disabled." });

		const userData = {
			"id": user.id,
			"username": user.username
		}

		const JWTtoken = generateJWTToken(userData);

		res.cookie("token", JWTtoken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 60 * 1000 });
		res.status(200).json({ ok: true, message: "Login successful!" });

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message });
	}
}

export const log_out = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ ok: true, message: "Logged out successful!" });
	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message });
	}
}

export const me = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ ok: true, message: "Login successful!" });
	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message });
	}
}
