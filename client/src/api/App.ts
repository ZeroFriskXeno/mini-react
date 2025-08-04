import type { Response, PostData } from "../types/types";

import { fetchCSRF } from "../middleware/csrf";

export const fetchNewPost = async (postData: PostData): Promise<Response> => {

	const res = await fetchCSRF('/api/app/new_post', {
		method: 'POST',
		body: JSON.stringify(postData)
	})

	return res.json();

}