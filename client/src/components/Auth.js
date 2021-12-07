import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [state, setState] = useState({ email: undefined, password: undefined, token: undefined });

    const handleChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.value });
    }

    const register = async (e) => {
        e.preventDefault();

        await axios
            .post('/api/users', state)
            .then(response => {
                console.log('Response: ', response);

                console.log('authorization: ', response.headers.authorization);
                setState(prevState => ({...prevState, token: response.headers.authorization }));    // not able to save the token
            })
            .catch(error => console.error('Error: ', error));
    }

    const login = async (e) => {
        e.preventDefault();

        axios
            .post('/api/users', state)
            .then(response => console.log('Result: ', response))
            .catch(error => console.error('Error: ', error));
    }

    return(
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
    );
}

export default Auth;