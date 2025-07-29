import type { AuthData, Response } from "./types/types";

import { useEffect, useState } from "react";

import * as Modals from './components/modals/';
// import Post from "./components/Post"
import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Section from "./components/Section"
import Overlay from "./components/Overlay";
import ApiStatus from "./components/Status";

import { ThumbsUp, Clock, TrendingUp, Repeat } from "react-feather";

import { fetchRegister } from "./api/Register";
import { fetchLogin } from "./api/Login";

export default function App() {

	const [ showOverlay, setShowOverlay ] = useState(false);
	const [ showPanel, setShowPanel ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ ModalContent, setModalContent ] = useState(0);

	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const [ logged, setLogged ] = useState(false);

	const toggler = () => { toggleModal(); togglePanel(); }
	const togglePanel = () => { setShowPanel(!showPanel); setShowOverlay(true); }
	const toggleModal = () => { setShowModal(!showModal); setShowOverlay(true); }
	// const forceShowPanel = () => { setShowPanel(true); setShowOverlay(true); }
	const forceShowModal = () => { setShowModal(true); setShowOverlay(true); }
	const hideAll = () => { setShowPanel(false); setShowModal(false); setShowOverlay(false); }

	const handleRegister = async (userData: AuthData): Promise<Response> => {
		try {

			const result = await fetchRegister(userData);

			if (result.ok) {
				setSuccess(result.message);
			} else {
				setError(result.message);
			}

			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}
	};

	const handleLogin = async (userData: AuthData): Promise<Response> => {
		try {

			const result = await fetchLogin(userData);

			if (result.ok) {
				setSuccess(result.message);
			} else {
				setError(result.message);
			}

			return result;

		} catch (error) {
			setError((error as Error).message);
			return { ok: false, message: (error as Error).message };
		}
	};

	const ModalContents = [
		< Modals.Secret />,
		< Modals.Register register={handleRegister} cancel={hideAll} switcher={()=>setModalContent(4)} />,
		< Modals.Error error={error} cancel={() => {setError(null); hideAll();}} />,
		< Modals.Success success={success} cancel={() => {setSuccess(null); hideAll();}} />,
		< Modals.Login login={handleLogin} cancel={hideAll} switcher={()=>setModalContent(1)} />,
	]

	useEffect(() => {

		const sessionToken = localStorage.getItem("sessionToken");
		if ( sessionToken ) {
			// TODO check token
		} else {
			setLogged(false)
		}

	}, [])

	useEffect(() => {
		if (error && error.trim() !== '') {
			setModalContent(2);
			forceShowModal();
		}
		if (success && success.trim() !== '') {
			setModalContent(3);
			forceShowModal();
		}
	}, [error, success]);

	return (
		<>

			< Panel slide={showPanel} close={hideAll} logged={logged}
				onRegister={ () => { toggler(); setModalContent(1); } }
				onLogin={ ()=> { toggler(); setModalContent(4); } }
			/>
			< Modal show={showModal} action={hideAll} content={ModalContents[ModalContent]} />
			< Overlay show={showOverlay} />

			<header>

				<img height="128 " width="128" src="https://cdn.simpleicons.org/react" onClick={togglePanel} />
				<h4 onClick={() => { toggleModal(); setModalContent(0); }} > Mini-React </h4>
				< ApiStatus  />
				<small>v 1.0.0</small>

			</header>

			<main>

				< Section title="Most liked" icon={< ThumbsUp className="stroke-blue-950" />} posts={ <></> } />
				< Section title="Newest posts" icon={< Clock className="stroke-blue-950" />} posts={ <></> } />
				< Section title="Trend" icon={< TrendingUp className="stroke-blue-950" />} posts={ <></> } />
				< Section title="For you" icon={< Repeat className="stroke-blue-950" />} posts={ <></> } />

			</main>

		</>
	)

}
