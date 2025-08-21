import { useState } from "react"
import type { ResponseData, UserData } from "../../types/types"

export default function Login(
	{ login, 												cancel,				switcher 			}:
	{ login: (userData: UserData)=>Promise<ResponseData>, 	cancel: ()=>void, 	switcher: ()=>void	} ) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ fetching, setFetching ] = useState(false);

	const data: UserData = {
		"username": username,
		"password": password
	}

	return (
		<>

			<h3 className="text-blue-950">Login</h3>
			<p className="text-blue-950">Sign in to access your account and start posting.</p>

			<form>
				<small className="text-blue-950">Username</small>
				<input
					type="text"
					placeholder="hppsrc"
					value={username}
					onChange={(e)=>setUsername(e.target.value)}
					disabled={fetching}
				/>

				<small className="text-blue-950">Password</small>
				<input
					type="password"
					placeholder="********"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					disabled={fetching}
				/>

				<small className="text-blue-950">Don't have an account? <span onClick={switcher} className="underline cursor-pointer" >Sign up</span> </small> <br />

				<button
					className="btn blue"
					disabled={fetching}
					onClick={() => {setFetching(true); login(data)}}>
					<p>Login</p>
				</button>
				<button
					className="btn red"
					disabled={fetching}
					onClick={cancel}>
					<p>Cancel</p>
				</button>
			</form>

		</>
	)
}
