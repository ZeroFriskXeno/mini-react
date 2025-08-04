import { useEffect } from "react";
import { ThumbsUp, Clock, TrendingUp, Repeat, MessageSquare } from "react-feather";

import * as Modals from './components/modals/';
import Post from "./components/Post"
import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Section from "./components/Section"
import Overlay from "./components/Overlay";
import ApiStatus from "./components/Status";

import * as Hooks from "./hooks"
import { useGlobalStore } from "./store/globalStore";

export default function App() {

	const { error, success, setError, setSuccess } = useGlobalStore();

	const {
		logged,
		handleRegister, handleLogin, handleMe
	} = Hooks.useAuth();

	const {
		showOverlay, showPanel, showModal, modalContent,
		togglePanel, toggleModal, hideAll, forceShowModal, setModalContent, toggler
	} = Hooks.useUIState();

	const {
		handleNewPost
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
		handleMe();
	}, []);

	useEffect(() => {
		if (error?.trim()) {
			setModalContent(1);
			forceShowModal();
		}
		if (success?.trim()) {
			setModalContent(2);
			forceShowModal();
		}
	}, [error, success]);

	return (
		<>

			< Panel slide={showPanel} close={hideAll} logged={logged}
				onRegister={ 	()=>{ toggler(); setModalContent(3); } }
				onLogin={ 		()=>{ toggler(); setModalContent(4); } }
				newPost={ 		()=>{ toggler(); setModalContent(5); } }
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

				< Section title="Most liked" icon={< ThumbsUp className="stroke-blue-950" />} posts={ <>
					< Post author="hppsrc" liked={false} content="post" likesCount={5} postdate={new Date} />
				</> } />
				< Section title="Newest posts" icon={< Clock className="stroke-blue-950" />} posts={ <></> } />
				< Section title="Trend" icon={< TrendingUp className="stroke-blue-950" />} posts={ <></> } />
				< Section title="For you" icon={< Repeat className="stroke-blue-950" />} posts={ <></> } />

			</main>

		</>
	)

}
