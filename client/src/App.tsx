import type { PostProps } from "./types/types";

import { useEffect, useState } from "react";
import { ThumbsUp, Clock, TrendingUp, Repeat, MessageSquare } from "react-feather";

import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Section from "./components/Section"
import Overlay from "./components/Overlay";
import ApiStatus from "./components/Status";
import * as Modals from './components/modals/';

import * as Hooks from "./hooks"
import { useGlobalStore } from "./store/globalStore";

export default function App() {

	const { error, success, setError, setSuccess } = useGlobalStore();

	const [mostLiked, setMostLiked] = useState<PostProps[]>([]);
	const [newestPosts, setNewestPosts] = useState<PostProps[]>([]);
	const [trending, setTrending] = useState<PostProps[]>([]);
	const [forYou, setForYou] = useState<PostProps[]>([]);

	const {
		logged,
		handleRegister, handleLogin, handleMe
	} = Hooks.useAuth();

	const {
		showOverlay, showPanel, showModal, modalContent,
		togglePanel, toggleModal, hideAll, forceShowModal, setModalContent, toggler
	} = Hooks.useUIState();

	const {
		handleNewPost, handlePostLikes, handleNewPosts, handleTrending, handleForYou
	} = Hooks.usePost();

	const ModalContents = [
		< Modals.Secret />,
		< Modals.Error		error={error} 				cancel={() => {setError(null); hideAll();}} />,
		< Modals.Success	success={success} 			cancel={() => {setSuccess(null); hideAll();}} />,
		< Modals.Register	register={handleRegister} 	cancel={hideAll} 		switcher={()=>setModalContent(4)} />,
		< Modals.Login		login={handleLogin} 		cancel={hideAll} 		switcher={()=>setModalContent(3)} />,
		< Modals.Post		post={handleNewPost} 		cancel={hideAll} />,
	]

	useEffect(() => {

		const fetchData = async () => {
			try {

				handleMe();

				setMostLiked(await handlePostLikes());
				setNewestPosts(await handleNewPosts());
				setTrending(await handleTrending());
				setForYou(await handleForYou());

			} catch (error) {
				setError((error as Error).message);
			}
		};

		fetchData();

	}, []);

	useEffect(() => {
		if (error?.trim()) { setModalContent(1); forceShowModal(); }
		if (success?.trim()) { setModalContent(2); forceShowModal(); }
	}, [error, success]);

	return (
		<>

			< Panel slide={showPanel} close={hideAll} logged={logged}
				onRegister={ 	()=>{ toggler(); setModalContent(3); } }
				onLogin={ 		()=>{ toggler(); setModalContent(4); } }
				onNewPost={ 	()=>{ toggler(); setModalContent(5); } }
			/>
			< Modal show={showModal} action={hideAll} content={ModalContents[modalContent]} />
			< Overlay show={showOverlay} />

			<header>

				<div>
					<img height="128 " width="128" src="https://cdn.simpleicons.org/react" onClick={togglePanel} />
					<h4 onClick={() => { toggleModal(); setModalContent(0); }} > Mini-React </h4>
					< ApiStatus  />
					<small>v 1.0.0</small>
				</div>

				<div>
					<div className="btn blue" onClick={logged ? ()=>{setModalContent(5); forceShowModal();} : ()=>{setModalContent(4); forceShowModal();} }>
						< MessageSquare />
						<p className="ml-2">New Post</p>
					</div>
				</div>

			</header>

			<main>

				<Section title="Most liked" 	icon={<ThumbsUp className="stroke-blue-950" />} 	posts={mostLiked} />
				<Section title="Newest posts" 	icon={<Clock className="stroke-blue-950" />} 		posts={newestPosts} />
				<Section title="Trend" 			icon={<TrendingUp className="stroke-blue-950" />} 	posts={trending} />
				<Section title="For you" 		icon={<Repeat className="stroke-blue-950" />} 		posts={forYou} />

			</main>

		</>
	)

}
