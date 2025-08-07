import type { ResponseData, PostData } from "../types/types";

import { fetchCSRF } from "../middleware/csrf";

export const fetchNewPost = async (postData: PostData): Promise<ResponseData> => {

	const res = await fetchCSRF('/api/app/new_post', {
		method: 'POST',
		body: JSON.stringify(postData)
	})

	return res.json();

}

export const fetchPostLikes = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/likes')
	return res.json()
}

export const fetchPostNew = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/new')
	return res.json()
}

export const fetchPostTrend = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/trend')
	return res.json()
}

export const fetchPostRandom = async (): Promise<ResponseData> => {
	const res = await fetch('/api/app/get_post/random')
	return res.json()
}
