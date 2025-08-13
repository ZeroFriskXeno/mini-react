import type { PostData, PostProps } from "../types/types";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { ThumbsUp, MoreVertical, ArrowUp, AlertTriangle } from "react-feather";

export default function Post( { id, username, liked, likes, reports, content, post_time, likeAction, likeUpdate, reportAction }: PostProps ) {

	const [ isExpanded, setExpanded ] = useState(false);
	const [ likesValue, setLikesValue ] = useState("");
	const [ fetching, setFetching ] = useState(false);

	const toggleExpanded = () => { setExpanded(!isExpanded); }

	const data: PostData = {
		"id": 0,		// ? on router.post('/app/post/like', ..., verifyJWTtoken, <= overwrites id for user_id
		"post_id": id,	// * so using post_id? sends real post id
		"username": username,
		"content": content,
		"likes": likes,
		"reports": reports,
		"post_time": post_time
	}

	const likeWrapper = async () => {
		setFetching(true);
		try {
			await likeAction(data);
			await likeUpdate();
		} catch (err) {
			console.error("Error al hacer like:", err);
		} finally {
			setFetching(false);
		}
	};

	const reportWrapper = () => {
		reportAction(data);
	};

	const overlayFetching = () => {
		return (
			<p className="text-overlay absolute top-1/2 left-1/2 translate-[-50%]">...</p>
		)
	}

	const extended = () => {
		return (
			<div className="down" >

				<div>
					<span>{content}</span>
				</div>

				{/* <small>Post ID:{id}</small> */}

				<div>
					< AlertTriangle className="img" color="#f3f4f6" fill="#e5a13e" onClick={reportWrapper} />
					< ArrowUp className="img" color="#f3f4f6" onClick={toggleExpanded} />
				</div>

			</div>
		)
	}

	useEffect(() => {
		setLikesValue(String(likes));
	}, [likes]);

	return (
		<>
			<div className={`relative ${!isExpanded ? "post" : "post-exp"} ${fetching ? "fetching" : ""} ` } >
				{ fetching ? overlayFetching() : null }
				<div className="top">

					<div className="left">

						<b >
							{username}
						</b>
						<p className={!isExpanded ? "" : "exp" } >
							{ !isExpanded ? content.slice(0,15).concat("...") : dayjs(post_time).format('hh:mm A DD/MM/YY') }
						</p>

					</div>

					<div className="right">

						<div
							className={ !liked ? "likes " : "likes bg-blue-800" }
							onClick={ likeWrapper }
						>
							<p> {likesValue} </p>
							< ThumbsUp
								color="#f3f4f6"
								fill={!liked ? "#22f0" : "#22f" }
							/>
						</div>

						< MoreVertical
							color="#f3f4f6"
							className={!isExpanded ? "more" : "more exp" }
							onClick={toggleExpanded}
						/>

					</div>

				</div>
				{!isExpanded ?  null : extended()}
			</div>
		</>
	)
}
