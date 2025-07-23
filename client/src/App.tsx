import { useState } from "react"

import Post from "./components/Post"
import Panel from "./components/Panel";
import Section from "./components/Section"
import Overlay from "./components/Overlay";

import { ThumbsUp, Clock, TrendingUp, Repeat } from "react-feather";

export default function App() {

	const [ showPanel, setShowPanel ] = useState(true);
	const [ showOverlay, setShowOverlay ] = useState(false);

	const togglePanel = () => {
		setShowPanel(!showPanel);
		toggleOverlay();
	}
	const toggleOverlay = () => {
		setShowOverlay(!showOverlay)
	}

	const commonPost = () => {
		return (
			< Post
				author="hppsrc"
				liked={false}
				likesCount={0}
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
				postdate={new Date("2025-01-01T00:00:00")}
			/>
		)
	}

	return (
		<>

			< Panel slide={showPanel} action={togglePanel} />
			< Overlay show={showOverlay} />

			<header>

				<img
					height="128 " width="128"
					src="https://cdn.simpleicons.org/react"
					onClick={togglePanel}
				/>
				<h4>Mini-React</h4>
				<div> <small>v 1.0.0</small> </div>

			</header>

			<main>

				<Section
					title="Most liked"
					icon={< ThumbsUp className="stroke-blue-950" />}
					posts={ [commonPost()] }
				/>
				<Section
					title="Newest posts"
					icon={< Clock className="stroke-blue-950" />}
					posts={ [commonPost()] }
				/>
				<Section
					title="Trend"
					icon={< TrendingUp className="stroke-blue-950" />}
					posts={ [commonPost()] }
				/>
				<Section
					title="For you"
					icon={< Repeat className="stroke-blue-950" />}
					posts={ [commonPost()] }
				/>

			</main>

		</>
	)

}
