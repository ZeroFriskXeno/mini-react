import type { SectionProps } from "../types/types"

export default function Section( {title, icon, posts}: SectionProps ) {
	return (
		<>
			<div className="Section">
				<div className="top-section">
					<h4>{title}</h4>
					{icon}
				</div>
				{posts}
			</div>
		</>
	)
}
