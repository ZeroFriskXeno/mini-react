import { useState } from "react"

import type { ResponseData, UserData } from "../../types/types"

export default function DeleteUser(
	{ deleteUser, 												cancel				}:
	{ deleteUser: (userData: UserData)=>Promise<ResponseData>, 	cancel: ()=>void	} ) {

	const [ fetching, setFetching ] = useState(false);
	const [ password, setPassword ] = useState("");

		const data: UserData = {
			"username": "",
			"password": password
		}

	return (
		<>

			<h3 className="text-blue-950">Delete your user</h3>
			<p className="text-blue-950">Delete your user account and all your posts, this can't be undone.</p>

			<u className="text-blue-950">Please enter your passoword to confirm that you are sure of your action.</u>

			<br />

			<small className="text-blue-950">Password</small>
			<input
				type="password"
				placeholder="********"
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
				disabled={fetching}
			/>

			<button
				className="btn red"
				disabled={fetching}
				onClick={() => {setFetching(true); deleteUser(data)}}>
				<p>Delete</p>
			</button>
			<button
				className="btn blue"
				disabled={fetching}
				onClick={cancel}>
				<p>Cancel</p>
			</button>

		</>
	)
}
