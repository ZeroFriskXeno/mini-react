import type { ResponseData, PostData } from "../types/types";

import { fetchCSRF } from "../middleware/csrf";

export const fetchPostNew = async (postData: PostData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/app/post/new', {
		method: 'POST',
		body: JSON.stringify(postData)
	})

	return res.json();

}

export const fetchPostLike = async (postData: PostData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/app/post/like', {
		method: 'POST',
		body: JSON.stringify(postData)
	})

	return res.json();

}

export const fetchGetPostLikes = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/likes')
	return res.json()
}

export const fetchGetPostNew = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/new')
	return res.json()
}

export const fetchGetPostTrend = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/trend')
	return res.json()
}

export const fetchGetPostRandom = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/random')
	return res.json()
}
