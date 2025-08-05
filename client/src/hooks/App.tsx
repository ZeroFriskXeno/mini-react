import type { PostData, PostProps, ResponseData } from "../types/types";

import { fetchNewPost, fetchPostLikes } from "../api/App";
import { useGlobalStore } from "../store/globalStore";

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

	const handleNewPosts = async (): Promise<PostProps[]> => { return [] }
	const handleTrending = async (): Promise<PostProps[]> => { return [] }
	const handleForYou = async (): Promise<PostProps[]> => { return [] }

	return {
		handleNewPost, handlePostLikes, handleNewPosts, handleTrending, handleForYou
	};

};