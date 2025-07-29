export default function Error({error, cancel}: {error: string | null, cancel: ()=>void} ) {
	return (
		<>
			<h3 className="text-red-500">Error</h3>
			<p className="text-blue-950">{error}</p>
			<button className="btn red" onClick={cancel}><p>Ok</p></button>
		</>
	)

}