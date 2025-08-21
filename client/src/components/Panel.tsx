import { APP_BUILD } from "../store/global";
import type { PanelProps } from "../types/types"

import PanelOption from "./PanelOption";

import { Clock, GitHub, LogIn, LogOut, MessageSquare, UserMinus, UserPlus, X  } from "react-feather";

import ReactIcon from "../assets/react.svg";

export default function Panel( { logged, slide, close: close, onRegister, onLogin, onNewPost, onLogout, onUserDelete, onChangelog }:PanelProps ) {
	return (
		<>

			<div id="panel" className={!slide ? "right-3/2 sm:right-3/2" : "right-0/2 sm:right-2/6 md:right-2/6 lg:right-1/2"}>

				< X className="absolute" id="close" onClick={()=>{close()}} />

				<div id="panel-top">
					<img height="80" width="80" src={ReactIcon} />
					<h1>Mini-React</h1>
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
							{/* <PanelOption icon={< AlertTriangle />} text="Reports" action={onReportCheck} /> */}
							<PanelOption icon={< LogOut />} text="Log out" action={onLogout} />
							<PanelOption icon={< UserMinus />} text="Delete user" action={onUserDelete} />
						</>
					)}

					<PanelOption icon={< Clock />} text="Changelog" action={onChangelog} />


				</div>

				<hr />

				<div id="panel-down" className="flex items-end" >
					<PanelOption icon={< GitHub />} text="Source code!" action={()=>window.open("https://github.com/hppsrc/mini-react", "_blank")} />
				</div>

			</div>

			{slide ? <div id="panel-side" onClick={()=>{close()}}>
				<small>Click anywhere outside to close the panel</small>
				<small>Build {APP_BUILD}</small>
			</div> : null}

		</>
	);
};

