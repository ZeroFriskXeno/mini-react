import type { PanelProps } from "../types/types"

import PanelOption from "./PanelOption";

import { AlertTriangle, Clock, GitHub, Heart, Info, LogIn, LogOut, MessageSquare, User, UserCheck, UserMinus, UserPlus, UserX } from "react-feather";

export default function Panel( { logged, slide, close: close, onRegister, onLogin, onNewPost }:PanelProps ) {
	return (
		<>
			<div id="panel" className={!slide ? "right-3/2" : "right-1/2"}>

				<small className="absolute" >Build 2508032201</small>

				<div id="panel-top">
					<img height="80" width="80" src="https://cdn.simpleicons.org/react" />
					<h1 >Mini-React</h1>
				</div>

				<hr />

				<div id="panel-mid" className="flex flex-col">

					{!logged ? (
						<>
							<PanelOption icon={< UserPlus />} text="Register" action={onRegister} />
							<PanelOption icon={< LogIn />} text="Login" action={onLogin} />
						</>
					) : (
						<>
							<PanelOption icon={< MessageSquare />} text="New post" action={onNewPost} />
							{/* <PanelOption icon={< LogOut />} text="Log out" action={onLogout} /> */}
							{/* <PanelOption icon={< UserMinus />} text="Delete user" action={onUserDelete} /> */}
							{/* <PanelOption icon={< AlertTriangle />} text="Reports" action={onReportCheck} /> */}
							{/* <PanelOption text="Profile" action={onProfile} /> */}
							{/* <PanelOption text="Logout" action={onLogout} /> */}
						</>
					)}

					{/* <PanelOption icon={< Clock />} text="Changelog" action={onChangelogCheck} /> */}

				</div>

				<hr />

				<div id="panel-down" className="flex items-end" >
					<PanelOption icon={< Heart fill="#f22" />} text="Check the credits!" action={()=>window.open("https://github.com/hppsrc/mini-react/blob/main/CREDITS.md", "_blank")} />
					<PanelOption icon={< GitHub />} text="Check the source code!" action={()=>window.open("https://github.com/hppsrc/mini-react", "_blank")} />
					{/* <PanelOption icon={< Info />} text="About this" action={()=>{}} /> */}
				</div>

			</div>
			{slide ? <div id="panel-side" onClick={()=>{close()}}> <small>Click anywhere outside to close the panel</small> </div> : null}
		</>
	);
};

