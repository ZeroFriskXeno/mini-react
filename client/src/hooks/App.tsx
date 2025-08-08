import type { PostData, PostProps, ResponseData } from "../types/types";

import { useGlobalStore } from "../store/globalStore";

import { fetchGetPostLikes, fetchGetPostNew, fetchGetPostTrend, fetchGetPostRandom, fetchPostNew, fetchPostLike } from "../api/App";

export const usePost = () => {
  	const { setError, setSuccess } = useGlobalStore();

	function modal(show: boolean, message: string) {
		if (show) setSuccess(message);
	}

	const handlePostNew = async (postData: PostData): Promise<ResponseData> => {

		try {

			const result = await fetchPostNew(postData);
			if (result.ok) setSuccess(result.message);

			else setError(result.message);
			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handlePostLike = async (postData: PostData): Promise<ResponseData> => {

		try {

			const result = await fetchPostLike(postData);
			const showmodal = result.modal || true;
			if (result.ok) modal(showmodal, result.message);

			else setError(result.message);
			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handlePostLikes = async (): Promise<PostProps[]> => {

		try {

			const result = await fetchGetPostLikes();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
				id: post.id,
				username: post.username,
				liked: false,
				likes: post.likes,
				content: post.content,
				post_time: post.post_time
			}));

		} catch (error) {
			setError((error as Error).message);
    		return [];
		}

	};

	const handleNewPosts = async (): Promise<PostProps[]> => {

		try {

			const result = await fetchGetPostNew();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
				id: post.id,
				username: post.username,
				liked: false,
				likes: post.likes,
				content: post.content,
				post_time: post.post_time
			}));

		} catch (error) {
			setError((error as Error).message);
    		return [];
		}

	}

	const handleTrending = async (): Promise<PostProps[]> => {

		try {

			const result = await fetchGetPostTrend();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
				id: post.id,
				username: post.username,
				liked: false,
				likes: post.likes,
				content: post.content,
				post_time: post.post_time
			}));

		} catch (error) {
			setError((error as Error).message);
    		return [];
		}

	}

	const handleRandom = async (): Promise<PostProps[]> => {

		try {

			const result = await fetchGetPostRandom();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
				id: post.id,
				username: post.username,
				liked: false,
				likes: post.likes,
				content: post.content,
				post_time: post.post_time
			}));

		} catch (error) {
			setError((error as Error).message);
    		return [];
		}

	}

	return {
		handlePostNew, handlePostLike,
		handlePostLikes, handleNewPosts, handleTrending, handleRandom
	};

};