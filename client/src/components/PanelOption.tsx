import type { PanelOptionProps } from "../types/types"

export default function PanelOption({icon, text, action}:PanelOptionProps ) {
	return (
		<div className="option" onClick={action} >
			{icon}
			{text}
		</div>
	)
}