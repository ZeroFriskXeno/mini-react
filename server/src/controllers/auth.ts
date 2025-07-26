import * as argon2 from "argon2";
import { Request, Response } from "express";
import { supabase } from "../supabase/client";

export const register = async (req: Request, res: Response) => {

	try {

		// verifyCSRFToken(req, res, next());

		const { username, password: passwordBody } = req.body
		if ( !username || !passwordBody )
			return res.status(400).json({ ok: false, message: "Missing register data" })

		const password = await argon2.hash(passwordBody)

		const { data, error } = await supabase
			.from('users')
			.insert([{ username, password, status: 0  }])
			.select()
		if (error)
			return res.status(500).json({ ok: false, message: error.message })

		res.status(201).json({ok: true, message: "User created"})

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}

}
