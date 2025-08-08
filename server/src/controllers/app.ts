import dayjs from "dayjs";
import { Request, Response } from "express";

import { supabase } from "../supabase/client";

export const post_new = async (req: Request, res: Response) => {
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

export const post_like = async (req: Request, res: Response) => {
	try {

		const { post_id, id: user_id } = req.body;

		if (!post_id || !user_id) {
			return res.status(400).json({ ok: false, message: "Missing post or user ID" });
		}

		const { data: existing_like, error: like_check_error } = await supabase
			.from('likes')
			.select('id')
			.eq('user_id', user_id)
			.eq('post_id', post_id)
			.single();

		if (like_check_error && like_check_error.code !== 'PGRST116') {
			return res.status(500).json({ ok: false, message: "Error checking like" });
		}

		if (existing_like) {

			const { error: delete_error } = await supabase
				.from('likes')
				.delete()
				.eq('id', existing_like.id);

			if (delete_error) {
				return res.status(500).json({ ok: false, message: "Failed to unlike post" });
			}

			return res.status(200).json({ ok: true, message: "Like removed", modal: false });

		} else {

			const { error: insert_error } = await supabase
				.from('likes')
				.insert({ post_id, user_id });

			if (insert_error) {
				return res.status(500).json({ ok: false, message: "Failed to like post" });
			}

			return res.status(201).json({ ok: true, message: "Post liked", modal: false });

		}

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message });
	}
};

export const get_post_likes = async (req: Request, res: Response) => {
	try {

		const { data, error } = await supabase
			.from('posts')
			.select()
			.order("likes", { ascending: false })
			.limit(5);

		if (error) throw error;
		res.json({ ok: true, message: "Most liked post fetched", data: data });

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}
}

export const get_post_new = async (req: Request, res: Response) => {
	try {

		const { data, error } = await supabase
			.from('posts')
			.select()
			.order("post_time", { ascending: false })
			.limit(5);

		if (error) throw error;
		res.json({ ok: true, message: "Most recent post fetched", data: data });

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}
}

export const get_post_trend = async (req: Request, res: Response) => {
	try {

		const { data, error } = await supabase.rpc("get_trending_posts");

		if (error) throw error;
		res.json({ ok: true, message: "Most liked post fetched", data: data });

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}
}

export const get_post_random = async (req: Request, res: Response) => {
	try {

		const { data, error } = await supabase.rpc("get_random_posts");

		if (error) throw error;
		res.json({ ok: true, message: "Most liked post fetched", data: data });

	} catch (err) {
		res.status(500).json({ ok: false, message: (err as Error).message  });
	}
}
