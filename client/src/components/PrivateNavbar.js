import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap';
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

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('x-auth-token');
        navigate('/');
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
                                <NavDropdown.Item variant="primary" onClick={handleOpenFolderModal}>New Folder</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item variant="primary" onClick={handleNewDeck}>New Deck</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item variant="primary" onClick={handleLogout}>Logout</NavDropdown.Item>
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