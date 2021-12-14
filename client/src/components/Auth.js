import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import '../styles/container.css';

const Auth = () => {
	const [state, setState] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);

	const clearInputs = () => {
		document.getElementById('login-email').value = '';
		document.getElementById('login-password').value = '';
		document.getElementById('signup-email').value = '';
		document.getElementById('signup-password').value = '';
		document.getElementById('confirm-email').value = '';
		document.getElementById('confirm-password').value = '';
		setErrorMessage(null);
		setState({});
	}

	const handleChange = (e) => {
		e.preventDefault();
		console.log(e.target.value);
		setState({...state, [e.target.id]: e.target.value });
	}

	const signup = async (e) => {
		e.preventDefault();

		if(state['signup-email'].normalize() !== state['confirm-email'].normalize() || state['signup-password'].normalize() !== state['confirm-password'].normalize()){
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
			})
			.catch(error => {
				console.error('Error: ', error);
				setErrorMessage(error.message);
			});
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
			})
			.catch(error => {
				console.error('Error: ', error);
				setErrorMessage(error.message);
			});
	}

	return(
		<>
			<h1>Auth Page</h1>
			<Container className="border rounded border-secondary auth-container">
				<Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3" onSelect={clearInputs}>
					<Tab eventKey="login" title="Login">
						<Login handleChange={handleChange} login={login} />
					</Tab>
					<Tab eventKey="signup" title="Signup">
					<Signup handleChange={handleChange} signup={signup} />
					</Tab>
				</Tabs>
				{errorMessage && <h6>{errorMessage}</h6>}
			</Container>
		</>
	);
}

export default Auth;