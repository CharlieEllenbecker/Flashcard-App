import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import isAuth from '../services/isAuth';

const SignupForm = ({ handleCloseModal }) => {
    const [signupInput, setSignupInput] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setSignupInput({...signupInput, [e.target.name]: e.target.value });
	}

	const clearInputs = () => {
		document.getElementById('signup-email').value = '';
		document.getElementById('signup-password').value = '';
		document.getElementById('confirm-email').value = '';
		document.getElementById('confirm-password').value = '';
		setSignupInput({});
	}

    const signup = async (e) => {
		e.preventDefault();
		if(!(signupInput.email && signupInput.password && signupInput['confirm-email'] && signupInput['confirm-password']) || 
            (signupInput.email.normalize() !== signupInput['confirm-email'].normalize() || signupInput.password.normalize() !== signupInput['confirm-password'].normalize())) {
			setErrorMessage('Please check if your email or password is typed in correctly');
			return;
		}

		await axios
			.post('/api/users', {
				email: signupInput.email,
				password: signupInput.password
			})
			.then(response => {
				console.log('Signup response: ', response);
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
                    <Form.Control id="signup-email" name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                    <Form.Label>Confirm Email address</Form.Label>
                    <Form.Control id="confirm-email" name="confirm-email" type="email" placeholder="Confirm email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="signup-password" name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control id="confirm-password" name="confirm-password" type="password" placeholder="Confirm password" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={signup}>
                    Signup
                </Button>
            </Form>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default SignupForm;