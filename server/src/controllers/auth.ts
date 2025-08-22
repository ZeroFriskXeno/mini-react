import * as argon2 from "argon2";
import { Request, Response } from "express";
import { supabase } from "../supabase/client";
import { sanitizeInput } from "../util/sanitizer";
import { generateJWTToken } from "../middleware/jwt";
import { returnError } from "../util/error";

let COOKIE_LIFETIME = 60 * 60 * 1000;

export const register = async (req: Request, res: Response) => {
	try {
		const { username: usernameBody, password: passwordBody } = req.body;

		if (!usernameBody || !passwordBody)
			return res
				.status(400)
				.json({ ok: false, message: "Missing register data" });

		if (usernameBody.length < 3 || usernameBody.length > 15)
			return res.status(400).json({
				ok: false,
				message: "Username must be between 3 and 15 characters long."
			});

		if (
			passwordBody.length < 8 ||
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(passwordBody)
		)
			return res.status(400).json({
				ok: false,
				message:
					"Password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, and special characters."
			});

		const password = await argon2.hash(sanitizeInput(passwordBody));

		const { data, error } = await supabase
			.from("users")
			.insert([
				{
					username: sanitizeInput(usernameBody),
					password: password,
					status: 0,
				},
			])
			.select();
		if (error)
			return res.status(500).json({ ok: false, message: error.message });

		console.log("New user register");

		res.status(201).json({ ok: true, message: "User created!" });
	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password: passwordBody } = req.body;
		if (!username || !passwordBody)
			return res.status(400).json({ ok: false, message: "Missing login data" });

		const { data, error } = await supabase
			.from("users")
			.select("*")
			.eq("username", sanitizeInput(username));

		if (error || !data || data.length === 0)
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials!" });

		const user = data[0];

		const isMatch = await argon2.verify(
			user.password,
			sanitizeInput(passwordBody)
		);
		if (!isMatch)
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials!" });

		if (user.status == 1)
			return res.status(403).json({ ok: false, message: "User is disabled." });

		const userData = {
			id: user.id,
			username: user.username,
		};

		const JWTtoken = generateJWTToken(userData);

		res.cookie("token", JWTtoken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: COOKIE_LIFETIME,
			path: "/",
		});

		res.status(200).json({ ok: true, message: "Login successful!" });
	} catch (err) {
		res
			.status(500)
			.json({ ok: false, message: returnError((err as Error).message) });
	}
};

export const log_out = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ ok: true, message: "Logged out successful!" });
	} catch (err) {
		res
			.status(500)
			.json({ ok: false, message: returnError((err as Error).message) });
	}
};

export const me = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ ok: true, message: "Login successful!" });
	} catch (err) {
		res
			.status(500)
			.json({ ok: false, message: returnError((err as Error).message) });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { username, password: passwordBody } = req.body;
		if (!username || !passwordBody)
			return res.status(400).json({ ok: false, message: "Missing user data" });

		const { data: dataFetch, error: errorFetch } = await supabase
			.from("users")
			.select("*")
			.eq("username", sanitizeInput(username));

		if (errorFetch || !dataFetch || dataFetch.length === 0)
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials!" });

		const user = dataFetch[0];

		const isMatch = await argon2.verify(
			user.password,
			sanitizeInput(passwordBody)
		);
		if (!isMatch)
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials!" });

		if (user.status == 1)
			return res.status(403).json({ ok: false, message: "User is disabled." });

		const { data, error } = await supabase
			.from("users")
			.delete()
			.eq("username", sanitizeInput(username))
			.single();

		if (error)
			return res.status(500).json({ ok: false, message: "Error on request" });

		res.clearCookie("token");

		res.status(200).json({ ok: true, message: "User deleted successful!" });
	} catch (err) {
		res
			.status(500)
			.json({ ok: false, message: returnError((err as Error).message) });
	}
};
