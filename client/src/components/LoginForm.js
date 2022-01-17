import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ handleCloseModal }) => {
	const [state, setState] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setState({...state, [e.target.name]: e.target.value });
	}

	const clearInputs = () => {
		document.getElementById('login-email').value = '';
		document.getElementById('login-password').value = '';
		setState({});
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		if(!(state.email && state.password)) {
			setErrorMessage('Please check if your email or password is typed in correctly');
			return;
		}

		await axios
			.post('/api/login', {
				email: state.email,
				password: state.password
			})
			.then(response => {
				console.log('Login Response: ', response);
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
				clearInputs();
				handleCloseModal();
				navigate('/dashboard');
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
					<Form.Control id="login-email" name="email" type="email" placeholder="Enter email" onChange={handleChange} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control id="login-password" name="password" type="password" placeholder="Password" onChange={handleChange} />
				</Form.Group>
				<div className="center right">
					<Button variant="danger" onClick={handleCloseModal}>Cancel</Button>
					<Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>
				</div>
			</Form>
			{errorMessage && <p>{errorMessage}</p>}
		</>
	);
}

export default LoginForm;