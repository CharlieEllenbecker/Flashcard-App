import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import isAuth from '../services/isAuth';
import Login from './Login';
import Signup from './Signup';

const PrivateNavbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    let isAuthorized;

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowSignup = () => setShowSignup(true);
    const handleCloseSignup = () => setShowSignup(false);

    useEffect(() => {   // Change to a useRef hook?
        isAuthorized = isAuth();
    }, []);

    if(isAuthorized) {
        return <Navigate to="/dashboard" />
    } else {
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/home">Flashcard-App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">                         {/* TODO: NEEDED? */}
                            <Nav className="me-auto">
                                <Button variant="primary" onClick={handleShowLogin}>
                                    Login
                                </Button>
                                <Button variant="primary" onClick={handleShowSignup}>
                                    Signup
                                </Button>
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
                        <Signup handleClose={handleCloseSignup} />
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
                        <Login handleClose={handleCloseLogin} />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default PrivateNavbar;