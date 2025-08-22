import { Request, Response } from "express";
import { supabase } from "../supabase/client";
import { returnError } from "../util/error";

export const statusSupabase = async (req: Request, res: Response) => {
	try {
		const { error } = await supabase.from("test").select().limit(1);
		if (error) throw error;
		res.json({ ok: true, message: "Supabase connected" });
	} catch (err) {
		res
			.status(500)
			.json({ ok: false, message: returnError((err as Error).message) });
	}
};
