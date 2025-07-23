import PanelOption from "./PanelOption"

export default function Panel( {slide, action}: {slide: boolean, action: () => void} ) {
	return (
		<>
			<div id="panel" className={!slide ? "right-1/2" : "right-3/2"}>

				<div id="panel-top">
					<img height="80" width="80" src="https://cdn.simpleicons.org/react" />
					<h1 >Mini-React</h1>
				</div>

				<div id="panel-mid">

					<hr />
					< PanelOption />

				</div>

				<small>Build 2507222001</small>

			</div>
			{!slide ? <div id="panel-side" onClick={()=>{action()}}> </div> : null}
		</>
	)
}