import { useState } from "react"
import type { ResponseData } from "../../types/types"

export default function Logout(
	{ logout, 								cancel				}:
	{ logout: ()=>Promise<ResponseData>,	cancel: ()=>void	} ) {

	const [ fetching, setFetching ] = useState(false);

	return (
		<>

			<h3 className="text-blue-950">Log out</h3>
			<p className="text-blue-950">Are you sure do you want to log out?</p>

			<button
				className={`btn red ${fetching ? "animate-pulse" : null } `}
				disabled={fetching}
				onClick={() => {setFetching(true); logout()}}>
				<p>{fetching ? "..." : "Yes"}</p>
			</button>
			<button
				className={`btn blue ${fetching ? "animate-pulse" : null } `}
				disabled={fetching}
				onClick={cancel}>
				<p>No</p>
			</button>

		</>
	)
}
