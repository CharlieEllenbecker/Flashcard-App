import { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const PrivateRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();
    let isUnmounted;

    const fetchIsAuth = async () => {
        setIsLoading(true);
        console.log('In FetchIsAuth');

        await axios
        .get('/api/login/is-auth', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
        .then(response => {
            if(!isUnmounted) {
                setIsAuth(true);
                setIsLoading(false);
            }
            console.log('Get Is Auth Response: ', response);
        })
        .catch(error => {
            if(!isUnmounted) {
                setIsAuth(false);
                setIsLoading(false);
            }
            console.error('Error: ', error);
            localStorage.removeItem('x-auth-token');
        });
    }

    useEffect(() => {
        isUnmounted = false;
        console.log('In Private Route');
        fetchIsAuth();
        return () => { isUnmounted = true; };
    }, []);
    
    return (
        <>
            {isLoading ?
                <LoadingSpinner /> :
                <>
                    {isAuth ? <Outlet /> : <Navigate to="/" state={{ from: location }} />}
                </>}
        </>
    );
}

export default PrivateRoute;