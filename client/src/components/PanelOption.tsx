import type { PanelOptionProps } from "../types/types"

export default function PanelOption({text, action}:PanelOptionProps ) {
	return (
		<div
			onClick={action}
			className="option"
		>
			{text}
		</div>
	)
}