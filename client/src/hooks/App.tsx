import type { PostData, PostProps, ReportData, ResponseData } from "../types/types";

import { useGlobalStore } from "../store/globalStore";

import { fetchGetPostLikes, fetchGetPostNew, fetchGetPostTrend, fetchGetPostRandom, fetchPostNew, fetchPostLike, fetchPostReport } from "../api/App";

export const usePost = () => {
  	const { setError, setSuccess } = useGlobalStore();

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
			if (!result.ok) setError(result.message);
			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}

	};

	const handlePostReport = async (postData: PostData, reportData: ReportData): Promise<ResponseData> => {

		try {

			const result = await fetchPostReport(postData, reportData);
			// if (result.ok) setSuccess(result.message);
			// else setError(result.message);

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
				...post
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
				... post
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
				... post
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
				... post
			}));

		} catch (error) {
			setError((error as Error).message);
    		return [];
		}

	}

	return {
		handlePostNew, handlePostLike, handlePostReport,
		handlePostLikes, handleNewPosts, handleTrending, handleRandom
	};

};