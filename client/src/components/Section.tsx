import type { SectionProps } from "../types/types"
import Post from "./Post"

export default function Section( {title, icon, posts}: SectionProps ) {
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
						username={post.username}
						liked={false}
						likes={post.likes}
						content={post.content}
						post_time={post.post_time}
					/>
				))}
			</div>
		</>
	)
}
