import axios from 'axios';

const isAuth = async () => {    // TODO: Fix the promise handling
    console.log('This code is being run');

    const token = localStorage.getItem('x-auth-token');
    if (token === null) {
        return false;
    }

    return await axios
        .get('/api/login/is-auth', { headers: { 'x-auth-token': token } })
        .then(response => {
            console.log('Get Is Auth Response: ', response);
            return true;
        })
        .catch(error => {
            console.error('Error: ', error);
            localStorage.removeItem('x-auth-token');
            return false;
        });
}

export default isAuth;