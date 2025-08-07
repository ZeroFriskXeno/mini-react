import type { PostData, PostProps, ResponseData } from "../types/types";

import { useGlobalStore } from "../store/globalStore";

import { fetchNewPost, fetchPostLikes, fetchPostNew, fetchPostTrend, fetchPostRandom } from "../api/App";

export const usePost = () => {
  	const { setError, setSuccess } = useGlobalStore();

	const handleNewPost = async (postData: PostData): Promise<ResponseData> => {

		try {

			const result = await fetchNewPost(postData);
			if (result.ok) setSuccess(result.message);

			else setError(result.message);
			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handlePostLikes = async (): Promise<PostProps[]> => {

		try {

			const result = await fetchPostLikes();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
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

			const result = await fetchPostNew();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
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

			const result = await fetchPostTrend();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
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

			const result = await fetchPostRandom();
			if (!result.ok || result.data == null) {
				setError(result.message);
				return [];
			}

			return result.data.map((post: any, i: number) => ({
				index: i,
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
		handleNewPost, handlePostLikes, handleNewPosts, handleTrending, handleRandom
	};

};