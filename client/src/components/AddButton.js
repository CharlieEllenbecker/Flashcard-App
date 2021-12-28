import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FolderForm from './FolderForm';

const AddButton = ({ type }) => {   // TODO: Refactor
    const [showAddCard, setShowAddCard] = useState(false);
    const [showAddDeck, setShowAddDeck] = useState(false);
    const [showAddFolder, setShowAddFolder] = useState(false);

    const handleOpenAddCard = () => setShowAddCard(true);
    const handleCloseAddCard = () => setShowAddCard(false);
    const handleOpenAddDeck = () => setShowAddDeck(true);
    const handleCloseAddDeck = () => setShowAddDeck(false);
    const handleOpenAddFolder = () => setShowAddFolder(true);
    const handleCloseAddFolder = () => setShowAddFolder(false);
    
    let showAdd;
    let handleOpen;
    let handleClose;

    if(type === 'card') {
        showAdd = showAddCard;
        handleOpen = handleOpenAddCard;
        handleClose = handleCloseAddCard;
    } else if(type === 'deck') {
        showAdd = showAddDeck;
        handleOpen = handleOpenAddDeck;
        handleClose = handleCloseAddDeck;
    } else if(type === 'folder') {
        showAdd = showAddFolder;
        handleOpen = handleOpenAddFolder;
        handleClose = handleCloseAddFolder;
    }

    return (
        <>
            <Button variant="primary" onClick={handleOpen}>+</Button>

            <Modal
                show={showAdd}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FolderForm handleCloseModal={handleCloseAddFolder} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddButton;