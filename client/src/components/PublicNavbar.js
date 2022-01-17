import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const PublicNavbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowSignup = () => setShowSignup(true);
    const handleCloseSignup = () => setShowSignup(false);

    return(
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Flashcard-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Login/Signup" id="basic-nav-dropdown">
                                <NavDropdown.Item variant="primary" onClick={handleShowLogin}>Login</NavDropdown.Item>
                                <NavDropdown.Item variant="primary" onClick={handleShowSignup}>Signup</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                show={showSignup}
                onHide={handleCloseSignup}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm handleCloseModal={handleCloseSignup} />
                </Modal.Body>
            </Modal>

            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleCloseModal={handleCloseLogin} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PublicNavbar;