import axios from 'axios';

const isAuth = async () => {
    const token = localStorage.getItem('x-auth-token');
    console.log('Token: ', token);

    const fetchIsAuth = async () => {
        await axios
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

    if (token === null) {
        console.log('Your mom is null');
        return false;
    } else {
        const auth = await fetchIsAuth();
        return auth;
    }
}

export default isAuth;