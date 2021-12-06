import React, { useState, useEffect } from 'react';

const Auth = () => {
    

    async function register(email, password) {

    }

    async function login(email, password) {
        
    }

    return(
        <form>
            <label>
                <p>Email</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div>
                <button type="submit" onClick={register}>Register</button>
                <button type="submit" onClick={login}>Login</button>
            </div>
        </form>
    );
}