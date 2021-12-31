import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FolderForm from './FolderForm';

const PrivateNavbar = () => {
    const [showAddFolder, setShowAddFolder] = useState(false);
    const navigate = useNavigate();

    const handleOpenFolderModal = () => setShowAddFolder(true);
    const handleCloseFolderModal = () => setShowAddFolder(false);

    const handleNewDeck = (e) => {
        e.preventDefault();
        return navigate('/decks/new');
    }

    return(
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard">Flashcard-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/folders">Folders</Nav.Link>
                            <Nav.Link as={Link} to="/decks">Decks</Nav.Link>
                            <NavDropdown title="Create" id="basic-nav-dropdown">
                                <Button variant="primary" onClick={handleOpenFolderModal}>New Folder</Button>
                                <NavDropdown.Divider />
                                <Button variant="primary" onClick={handleNewDeck}>New Deck</Button>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                show={showAddFolder}
                onHide={handleCloseFolderModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FolderForm handleCloseModal={handleCloseFolderModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PrivateNavbar;