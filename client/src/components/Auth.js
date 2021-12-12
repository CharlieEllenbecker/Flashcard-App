import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [state, setState] = useState({ email: undefined, password: undefined });

    const handleChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.value });
    }

    const register = async () => {
        await axios
            .post('/api/users', state)
            .then(response => console.log('Register response: ', response))
            .catch(error => console.error('Error: ', error));
    }

    const login = async () => {
        await axios
            .post('/api/users', state)
            .then(response => console.log('Login Response: ', response))
            .catch(error => console.error('Error: ', error));
    }

    return(
        <div>
            <h1>Auth Page</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input type="email" name="email" onChange={handleChange} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" onChange={handleChange} />
                </label>
                <div>
                    <button type="submit" onClick={register}>Register</button>
                    <button type="submit" onClick={login}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;