import { useState } from "react"
import type { PostData, ResponseData } from "../../types/types";

export default function Post(
	{ post, 												cancel				}:
	{ post:  (postData: PostData)=>Promise<ResponseData>,	cancel: ()=>void	} ) {

	const [ input, setInput ] = useState("");
	const [ counter, setCounter ] = useState(0);
	const [ fetching, setFetching ] = useState(false);

	const data: PostData = {
		id: 0,
		username: "",
		content: input,
		likes: 0,
		reports: 0,
		post_time: ""
	}

	return (
		<>

			<h3 className="text-blue-950">New Post</h3>

			<div className="flex justify-between">
				<small className="text-blue-950">Share your thoughs here...</small> <small className="text-blue-950">{250 - counter} characters remaining</small>
			</div>
			<textarea
				className={`h-45 ${fetching ? "animate-pulse" : null } `}
				placeholder="I like ice cream!"
				value={input}
				onChange={(e)=>{setCounter(e.target.value.length); setInput(e.target.value)}}
				disabled={fetching}
				maxLength={250}
			></textarea>

			<button
				className={`btn blue ${fetching ? "animate-pulse" : null } `}
				disabled={fetching}
				onClick={() => {setFetching(true); post(data)}}>
				<p>Post</p>
			</button>
			<button
				className={`btn red ${fetching ? "animate-pulse" : null } `}
				disabled={fetching}
				onClick={cancel}>
				<p>Cancel</p>
			</button>

		</>
	)
}
