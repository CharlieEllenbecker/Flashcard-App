import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FolderForm from './FolderForm';

const AddFolderButton = () => {
    const [showAddFolder, setShowAddFolder] = useState(false);

    const handleOpen = () => setShowAddFolder(true);
    const handleClose = () => setShowAddFolder(false);

    return (
        <>
            <Button variant="primary" onClick={handleOpen}>+</Button>

            <Modal
                show={showAddFolder}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FolderForm handleCloseModal={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddFolderButton;