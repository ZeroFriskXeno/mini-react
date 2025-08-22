import type { PostData, PostProps } from "./types/types";

import { useEffect, useState } from "react";
import { ThumbsUp, Clock, TrendingUp, Repeat, MessageSquare, LogIn } from "react-feather";

import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Section from "./components/Section"
import Overlay from "./components/Overlay";
import ApiStatus from "./components/Status";
import * as Modals from './components/modals/';
import ReactIcon from "./assets/react.svg"

import * as Hooks from "./hooks"
import { useGlobalStore } from "./store/globalStore";
import { APP_BUILD, APP_VERSION } from "./store/global";

export default function App() {

	const { error, success, setError, setSuccess } = useGlobalStore();
	const [postToReport, setPostToReport] = useState<PostData | null>(null);

	const [mostLiked, setMostLiked] = useState<PostProps[]>([]);
	const [newestPosts, setNewestPosts] = useState<PostProps[]>([]);
	const [trending, setTrending] = useState<PostProps[]>([]);
	const [random, setRandom] = useState<PostProps[]>([]);

	const {
		logged,
		handleRegister, handleLogin, handleMe, handleLogout, handleDeleteUser
	} = Hooks.useAuth();

	const {
		showOverlay, showPanel, showModal, modalContent,
		togglePanel, toggleModal, hideAll, forceShowModal, setModalContent, toggler
	} = Hooks.useUIState();

	const {
		handlePostNew, handlePostLike, handlePostReport,
		handlePostLikes, handleNewPosts, handleTrending, handleRandom
	} = Hooks.usePost();

	const ModalContents = [
		/*0*/ < Modals.Secret />,
		/*1*/ < Modals.Error		error={error} 					cancel={() => { setError(null); hideAll();} } />,
		/*2*/ < Modals.Success	success={success} 				cancel={() => { setSuccess(null); hideAll();} } />,
		/*3*/ < Modals.Register	register={handleRegister} 		cancel={hideAll} 		switcher={()=>setModalContent(4)} />,
		/*4*/ < Modals.Login		login={handleLogin} 			cancel={hideAll} 		switcher={()=>setModalContent(3)} />,
		/*5*/ < Modals.Post		post={handlePostNew} 			cancel={hideAll} />,
		/*6*/ < Modals.Logout		logout={handleLogout} 			cancel={hideAll} />,
		/*7*/ < Modals.DeleteUser	deleteUser={handleDeleteUser} 	cancel={hideAll} />,
		/*8*/ < Modals.Report		report={handlePostReport}		cancel={hideAll} post={postToReport} />,
		/*9*/ < Modals.Changelog	cancel={hideAll} />
	]

	const updateLikes = async () =>{
		setMostLiked(await handlePostLikes());
		setNewestPosts(await handleNewPosts());
		setTrending(await handleTrending());
		// setRandom(await handleRandom());
	}

	const reportWrapper = (postData: PostData) => {
		setPostToReport(postData);
		setModalContent(8);
		forceShowModal();
	}

	useEffect(() => {

		const fetchData = async () => {
			try {

				handleMe();

				setMostLiked(await handlePostLikes());
				setNewestPosts(await handleNewPosts());
				setTrending(await handleTrending());
				setRandom(await handleRandom());

			} catch (error) {
				setError((error as Error).message);
			}
		};

		fetchData();

		const build = localStorage.getItem("APP_BUILD");
		if (!build || build !== APP_BUILD ) {
			localStorage.setItem("APP_BUILD", APP_BUILD);
			setModalContent(9); forceShowModal();
		}

	}, []);

	useEffect(() => {
		if (error?.trim()) { setModalContent(1); forceShowModal(); }
		if (success?.trim()) { setModalContent(2); forceShowModal(); }
	}, [error, success]);

	useEffect(() => {
		updateLikes()
	}, [logged]);

	return (
		<>

			< Panel slide={showPanel} close={hideAll} logged={logged}
				onRegister={	()=>{ toggler(); setModalContent(3); } }
				onLogin={ 		()=>{ toggler(); setModalContent(4); } }
				onNewPost={		()=>{ toggler(); setModalContent(5); } }
				onLogout={		()=>{ toggler(); setModalContent(6); } }
				onUserDelete={	()=>{ toggler(); setModalContent(7); } }
				onChangelog={	()=>{ toggler(); setModalContent(9); } }
			/>
			< Modal show={showModal} action={hideAll} content={ModalContents[modalContent]} />
			< Overlay show={showOverlay} />

			<header>

				<div>
					<img height="128 " width="128" src={ReactIcon} onClick={togglePanel} />
					<h4 id="brand" onClick={() => { toggleModal(); setModalContent(0); }} > Mini-React </h4>
					< ApiStatus />
					<small>v {APP_VERSION}</small>
				</div>

				<div>
					<div className="btn blue" onClick={logged ? ()=>{setModalContent(5); forceShowModal();} : ()=>{setModalContent(4); forceShowModal();} }>
						{logged ? < MessageSquare />  : < LogIn /> }
						<p id="post-text" className="ml-2">{logged ? "New Post" : "Log in"}</p>
					</div>
				</div>

			</header>

			<main>

				<Section title="Most liked" 	icon={<ThumbsUp className="stroke-blue-950" />} 	posts={mostLiked}	likeAction={handlePostLike}	likeUpdate={updateLikes}	reportAction={reportWrapper}/>
				<Section title="Newest posts" 	icon={<Clock className="stroke-blue-950" />} 		posts={newestPosts} likeAction={handlePostLike}	likeUpdate={updateLikes}	reportAction={reportWrapper}/>
				<Section title="Trend" 			icon={<TrendingUp className="stroke-blue-950" />} 	posts={trending} 	likeAction={handlePostLike}	likeUpdate={updateLikes}	reportAction={reportWrapper}/>
				<Section title="Random" 		icon={<Repeat className="stroke-blue-950" />} 		posts={random} 		likeAction={handlePostLike}	likeUpdate={updateLikes}	reportAction={reportWrapper}/>

			</main>

		</>
	)

}
