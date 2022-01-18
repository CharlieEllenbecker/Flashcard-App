import { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

    const fetchIsAuth = async () => {
        await axios
        .get('/api/login/is-auth', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
        .then(response => {
            console.log('Get Is Auth Response: ', response);
            setIsAuth(true);
        })
        .catch(error => {
            console.error('Error: ', error);
            localStorage.removeItem('x-auth-token');
            setIsAuth(false);
        });
    }

    useEffect(() => {
        fetchIsAuth();
    }, []);
    
    return (
        <>
            {isAuth ? <Outlet /> : <Navigate to="/" state={{ from: location }} />}
        </>
    );
}

export default PrivateRoute;