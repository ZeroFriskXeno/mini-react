export default function Success({success, cancel}: {success: string | null, cancel: ()=>void} ) {
	return (
		<>
			<h3 className="text-blue-500">Success</h3>
			<p className="text-blue-950">{success}</p>
			<button className="btn blue" onClick={cancel}><p>Ok</p></button>
		</>
	)

}