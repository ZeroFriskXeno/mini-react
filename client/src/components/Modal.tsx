export default function Modal({ show, content }: { show: boolean, content: React.ReactNode }) {

	if (!show) return null;

	return (

		<div id="modal">
			{content}
		</div>


	)

}
