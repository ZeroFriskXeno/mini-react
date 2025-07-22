import { useState } from "react"

import Post from "./components/Post"
import Panel from "./components/Panel";
import Section from "./components/Section"
import Overlay from "./components/Overlay";

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

	return (
		<>

			< Panel slide={showPanel} />
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

			< Post
				author="hppsrc"
				liked={false}
				likesCount={0}
				content="LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM"
				postdate={new Date("2025-07-21T16:24:00")}
			/>

		</>
	)

}
