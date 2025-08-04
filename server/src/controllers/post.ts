import dayjs from "dayjs";
import { Request, Response } from "express";

import { supabase } from "../supabase/client";

export const new_post = async (req: Request, res: Response) => {

	try {

		const { id, username, content } = req.body;

		if (!id || !username || !content)
			return res.status(400).json({ ok: false, message: "Missing post data" });

		const { data, error: errorFetch } = await supabase
			.from("posts")
			.select("post_time")
			.eq("user_id", id)
			.order("post_time", { ascending: false })
			.limit(1);

		if (errorFetch)return res.status(500).json({ ok: false, message: errorFetch.message });

		const post = data?.[0];
		if (post && dayjs().diff(post.post_time, "minute") < 5)
			return res.status(429).json({ ok: false, message: "Rate limited. Try again later" });

		const { error: errorPost } = await supabase
			.from("posts")
			.insert([{ user_id: id, username, content }]);

		if (errorPost) return res.status(500).json({ ok: false, message: errorPost.message });

		res.status(201).json({ ok: true, message: "Posted!" });
		console.log("New post created");

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}

}
