import type { PanelProps } from "../types/types"


export default function Panel( {slide, action, options}:PanelProps ) {
	return (
		<>
			<div id="panel" className={!slide ? "right-3/2" : "right-1/2"}>

				<div id="panel-top">
					<img height="80" width="80" src="https://cdn.simpleicons.org/react" />
					<h1 >Mini-React</h1>
				</div>

				<div id="panel-mid">

					<hr />

					{options}

				</div>

				<small>Build 2507231901</small>

			</div>
			{slide ? <div id="panel-side" onClick={()=>{action()}}> </div> : null}
		</>
	)
}