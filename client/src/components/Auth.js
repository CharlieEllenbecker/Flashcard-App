import React, { useState, useEffect } from 'react';

const Auth = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const register = async (email, password) => {
        console.log('registering');

        
    }

    const login = async (email, password) => {
        console.log('logging in');
    }

    return(
        <form>
            <label>
                <p>Email</p>
                <input type="email" onChange={handleChangeEmail} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={handleChangePassword} />
            </label>
            <div>
                <button type="submit" onClick={register}>Register</button>
                <button type="submit" onClick={login}>Login</button>
            </div>
        </form>
    );
}

export default Auth;