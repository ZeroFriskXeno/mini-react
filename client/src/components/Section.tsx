import type { SectionProps } from "../types/types"
import Post from "./Post"

export default function Section(
	{title, icon, posts, likeAction, likeUpdate}: SectionProps

	 ) {
	return (
		<>
			<div className="Section">
				<div className="top-section">
					<h4>{title}</h4>
					{icon}
				</div>
				{posts.map((post, i) => (
					<Post
						key={i}
						{...post}
						likeAction={likeAction}
						likeUpdate={likeUpdate} // TODO fix type
					/>
				))}
			</div>
		</>
	)
}
