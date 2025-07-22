export default function Overlay({show}: {show: boolean}) {
	if (!show) return null
	return (
		<div id="overlay"></div>
	)
}