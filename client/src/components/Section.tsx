import type { SectionProps } from "../types/types"
import Post from "./Post"

export default function Section( {title, icon, posts, likeAction, likeUpdate, reportAction}: SectionProps ) {
	return (
		<>
			<div className="Section">

				<div className="top-section">
					<h3>{title}</h3>
					{icon}
				</div>

				{posts.map((post, i) => (
					<Post
						key={i}
						{...post}
						likeAction={likeAction}
						likeUpdate={likeUpdate}
						reportAction={reportAction}
					/>
				))}

			</div>
		</>
	)
}
