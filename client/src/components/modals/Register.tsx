import { useState } from "react"
import type { ResponseData, UserData } from "../../types/types"

export default function Register(
	{ register, 												cancel, 			switcher			}:
	{ register: (userData: UserData)=>Promise<ResponseData>,	cancel: ()=>void,	switcher: ()=>void	} ) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ fetching, setFetching ] = useState(false);

	const data: UserData = {
		"username": username,
		"password": password
	}

	return (
		<>

			<h3 className="text-blue-950">Register</h3>
			<p className="text-blue-950">Create a simple account to start making post on Mini-React. <br />Privacy? Nothing is tracked, used, etc.</p>

			<form>
				<small className="text-blue-950">Username</small>
				<input
					className={`${fetching ? "animate-pulse" : null } `}
					type="text"
					placeholder="hppsrc"
					value={username}
					onChange={(e)=>setUsername(e.target.value)}
					disabled={fetching}
				/>

				<small className="text-blue-950">Password</small>
				<input
					className={`${fetching ? "animate-pulse" : null } `}
					type="password"
					placeholder="********"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					disabled={fetching}
				/>

				<small className="text-blue-950">Already registered? <span onClick={()=>{fetching ? null : switcher() }} className="underline cursor-pointer" >Sign in</span> </small> <br />

				<button
					className={`btn blue ${fetching ? "animate-pulse" : null } `}
					disabled={fetching}
					onClick={() => {setFetching(true); register(data)}}>
					<p>Register</p>
				</button>
				<button
					className={`btn red ${fetching ? "animate-pulse" : null } `}
					disabled={fetching}
					onClick={cancel}>
					<p>Cancel</p>
				</button>
			</form>

		</>
	)
}
