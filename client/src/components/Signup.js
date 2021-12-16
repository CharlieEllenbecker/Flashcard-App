import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import isAuth from '../services/isAuth';

const Signup = ({ handleClose }) => {
    const [state, setState] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setState({...state, [e.target.id]: e.target.value });
	}

	const clearInputs = () => {
		document.getElementById('signup-email').value = '';
		document.getElementById('signup-password').value = '';
		document.getElementById('confirm-email').value = '';
		document.getElementById('confirm-password').value = '';
		setState({});
	}

    const signup = async (e) => {
		e.preventDefault();

		if(!(state['signup-email'] && state['signup-password'] && state['confirm-email'] && state['confirm-password']) || 
            (state['signup-email'].normalize() !== state['confirm-email'].normalize() || state['signup-password'].normalize() !== state['confirm-password'].normalize())){
			setErrorMessage('Please check if your email or password is typed in correctly');
			return;
		}

		await axios
			.post('/api/users', {
				email: state['signup-email'],
				password: state['signup-password']
			})
			.then(response => {
				console.log('Signup response: ', response);
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
				clearInputs();
                handleClose();
                if(isAuth) {
					navigate('/dashboard');
				}
			})
			.catch(error => {
				console.error('Error: ', error);
				setErrorMessage(error.message);
			});
	}

    return(
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id="signup-email" type="email" placeholder="Enter email" onChange={handleChange} />
                    <Form.Label>Confirm Email address</Form.Label>
                    <Form.Control id="confirm-email" type="email" placeholder="Confirm email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="signup-password" type="password" placeholder="Password" onChange={handleChange} />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control id="confirm-password" type="password" placeholder="Confirm password" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={signup}>
                    Signup
                </Button>
            </Form>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default Signup;