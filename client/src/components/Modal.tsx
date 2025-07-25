import type { ModalProps } from "../types/types";

export default function Modal({ show, content, action }:ModalProps ) {

	if (!show) return null;

	const clickHandler = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			action();
		}
	}

	return (

		<div id="modal-back" onClick={clickHandler}>
			<div id="modal" onClick={(e) => e.stopPropagation()} >
				{content}
			</div>
			<small>Click anywhere outside to close the modal</small>
		</div>

	)

}
