import { useState } from "react"

export default function Post(
	{post, cancel }:
	{post: ()=>void, cancel: ()=>void} ) {

	const [ input, setInput ] = useState("");
	const [ counter, setCounter ] = useState(0);
	const [ fetching, setFetching ] = useState(false);

	return (
		<>

			<h3 className="text-blue-950">New Post</h3>

			<div className="flex justify-between">
				<small className="text-blue-950">Share your thoughs here...</small> <small className="text-blue-950">{250 - counter} characters remaining</small>
			</div>
			<textarea
				className="h-45"
				placeholder="I like ice cream!"
				value={input}
				onChange={(e)=>{setCounter(e.target.value.length); setInput(e.target.value)}}
				disabled={fetching}
				maxLength={250}
			></textarea>

			<button
				className="btn blue"
				disabled={fetching}
				onClick={() => {setFetching(true); post()}}>
				<p>Post</p>
			</button>
			<button
				className="btn red"
				disabled={fetching}
				onClick={cancel}>
				<p>Cancel</p>
			</button>

		</>
	)

}