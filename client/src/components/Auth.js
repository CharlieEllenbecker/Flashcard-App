import React, { useState } from 'react';
import { Form } from 'react-bootstrap';		// utilize instead!
import axios from 'axios';

const Auth = () => {
	const [state, setState] = useState({});

	const clearInputs = () => {
		document.getElementById('email').value = '';
		document.getElementById('password').value = '';
		setState({});
	}

	const handleChange = (e) => {
		e.preventDefault();
		setState({...state, [e.target.id]: e.target.value });
	}

	const register = async (e) => {
		e.preventDefault();
		await axios
			.post('/api/users', state)
			.then(response => {
				console.log('Register response: ', response);
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
				clearInputs();
			})
			.catch(error => console.error('Error: ', error));
	}

	const login = async (e) => {
		e.preventDefault();
		await axios
			.post('/api/login', state)
			.then(response => {
				console.log('Login Response: ', response);
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
				clearInputs();
			})
			.catch(error => console.error('Error: ', error));
	}

	return(
		<>
			<h1>Auth Page</h1>
			<form>
				<label>
					<p>Email</p>
					<input type="email" id="email" onChange={handleChange} />
				</label>
				<label>
					<p>Password</p>
					<input type="password" id="password" onChange={handleChange} />
				</label>
				<div>
					<button type="submit" onClick={register}>Register</button>
					<button type="submit" onClick={login}>Login</button>
				</div>
			</form>
		</>
	);
}

export default Auth;