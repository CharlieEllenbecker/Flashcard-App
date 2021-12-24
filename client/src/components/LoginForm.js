import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import isAuth from '../services/isAuth';

const LoginForm = ({ handleCloseModal }) => {
	const [state, setState] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setState({...state, [e.target.id]: e.target.value });
	}

	const clearInputs = () => {
		document.getElementById('login-email').value = '';
		document.getElementById('login-password').value = '';
		setState({});
	}

	const login = async (e) => {
		e.preventDefault();

		await axios
			.post('/api/login', {
				email: state['login-email'],
				password: state['login-password']
			})
			.then(response => {
				console.log('Login Response: ', response);
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
				clearInputs();
				handleCloseModal();
				if(isAuth()) {
					navigate('/dashboard');
				}
			})
			.catch(error => {
				console.error('Error: ', error.response.data);
				setErrorMessage(error.response.data);
			});
	}

	return(
		<>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control id="login-email" type="email" placeholder="Enter email" onChange={handleChange} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control id="login-password" type="password" placeholder="Password" onChange={handleChange} />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={login}>
					Login
				</Button>
			</Form>
			{errorMessage && <p>{errorMessage}</p>}
		</>
	);
}

export default LoginForm;