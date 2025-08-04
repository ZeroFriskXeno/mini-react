import type { PostData, Response } from "../types/types";

import { fetchNewPost } from "../api/App";
import { useGlobalStore } from "../store/globalStore";

export const usePost = () => {
  	const { setError, setSuccess } = useGlobalStore();

	const handleNewPost = async (postData: PostData): Promise<Response> => {

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

	return {
		setError, setSuccess,
		handleNewPost
	};

};