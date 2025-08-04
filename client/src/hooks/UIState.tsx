import { useState } from 'react';

export const useUIState = () => {

	const [showOverlay, setShowOverlay] = useState(false);
	const [showPanel, setShowPanel] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(0);

	const toggler = ()=>{ toggleModal(); togglePanel(); }

	const togglePanel = ()=>{ setShowPanel(!showPanel); setShowOverlay(true); };
	const toggleModal = ()=>{ setShowModal(!showModal); setShowOverlay(true); };

	const hideAll = ()=>{ setShowPanel(false); setShowModal(false); setShowOverlay(false); };
	const forceShowModal =  ()=>{ setShowModal(true); setShowOverlay(true); };
	const forcePanelModal = ()=>{ setShowPanel(true); setShowOverlay(true); };

	return {
		showOverlay, showPanel, showModal, modalContent,
		togglePanel, toggleModal, hideAll, forceShowModal, forcePanelModal, setModalContent, toggler
	};

};