import type { PostProps } from "../types/types";

import dayjs from "dayjs";
import { useState } from "react";

import { ThumbsUp, MoreVertical, ArrowUp, AlertTriangle } from "react-feather";

export default function Post( {username: author, liked, likes: likesCount, content, post_time}: PostProps ) {

	const [ isExpanded, setExpanded ] = useState(false);
	const [ isLiked, setLiked ] = useState(liked);

	const toggleExpanded = () => { setExpanded(!isExpanded); }
	const like = () => { setLiked(!isLiked); }

	const down = () => {
		return (
			<div className="down" >

				<div>
					<span>{content}</span>
				</div>

				<div>
					< AlertTriangle
						className="img"
						color="#f3f4f6"
					/>
					< ArrowUp
						className="img"
						onClick={toggleExpanded}
						color="#f3f4f6"
					/>
				</div>

			</div>
		)
	}

	return (
		<>
			<div className={!isExpanded ? "post" : "post-exp"} >

				<div className="top">

					<div className="left">

						<b >
							{author}
						</b>
						<p className={!isExpanded ? "" : "exp" } >
							{ !isExpanded ? content.slice(0,15).concat("...") : <p>{dayjs(post_time).format('hh:mm A DD/MM/YY')}</p> }
						</p>

					</div>

					<div className="right">

						<div
							className={!isLiked ? "likes " : "likes bg-blue-800" }
							onClick={like}
						>
							<p>{!isLiked ? likesCount : likesCount+1 }</p>
							< ThumbsUp
								color="#f3f4f6"
								fill={!isLiked ? "#22f0" : "#22f" }

							/>
						</div>

						< MoreVertical
							color="#f3f4f6"
							className={!isExpanded ? "more" : "more exp" }
							onClick={toggleExpanded}
						/>

					</div>

				</div>

				{!isExpanded ?  null : down()}

			</div>
		</>
	)
}
