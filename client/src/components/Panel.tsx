import type { PanelProps } from "../types/types"

import PanelOption from "./PanelOption";

import { MessageSquare, User, UserCheck } from "react-feather";

export default function Panel( { logged, slide, close: close, onRegister, onLogin, newPost }:PanelProps ) {
	return (
		<>
			<div id="panel" className={!slide ? "right-3/2" : "right-1/2"}>

				<div id="panel-top">
					<img height="80" width="80" src="https://cdn.simpleicons.org/react" />
					<h1 >Mini-React</h1>
				</div>

				<div id="panel-mid">

					<hr />

					{!logged ? (
						<>
							<PanelOption icon={< UserCheck />} text="Register" action={onRegister} />
							<PanelOption icon={< User />} text="Login" action={onLogin} />
						</>
					) : (
						<>
							<PanelOption icon={< MessageSquare />} text="New post" action={newPost} />
							{/* <PanelOption text="Profile" action={onProfile} /> */}
							{/* <PanelOption text="Logout" action={onLogout} /> */}
						</>
					)}
				</div>

				<small>Build 2508032201</small>

			</div>
			{slide ? <div id="panel-side" onClick={()=>{close()}}> <small>Click anywhere outside to close the panel</small> </div> : null}
		</>
	);
};

