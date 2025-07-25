import { useState } from "react"

export default function Register({register, cancel}: {register: ()=>void, cancel: ()=>void} ) {

	const [ username, setUsername ] = useState("")
	const [ password, setPassword ] = useState("")

	return (
		<>

			<h3 className="text-blue-950">Register</h3>
			<p className="text-blue-950">Create a simple account to start making post on Mini-React. <br />Privacy? Nothing is tracked, used, etc.</p>

			<small className="text-blue-950">Username</small>
			<input
				type="text"
				placeholder="hppsrc"
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
			/>

			<small className="text-blue-950">Password</small>
			<input
				type="password"
				placeholder="********"
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
			/>

			<button className="btn blue" onClick={register}><p>Register</p></button>
			<button className="btn red" onClick={cancel}><p>Cancel</p></button>

		</>
	)

}