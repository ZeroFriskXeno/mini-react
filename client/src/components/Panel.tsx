export default function Panel(
	{slide}:
	{slide: boolean}
) {
	return (
		<div id="panel" className={!slide ? "right-1/2" : "right-3/2"}>

			<div className='flex flex-row items-center justify-center'>
				<img className='m-1' height="80" width="80" src="https://cdn.simpleicons.org/react" />
				<h1 className='m-1'>Mini-React</h1>
			</div>

			<div  className="flex-1"> </div>

			<small className="text-gray-700">Build 2507211801</small>

		</div>
	)
}