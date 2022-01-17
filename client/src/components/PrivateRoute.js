import { Navigate, useLocation, Outlet } from 'react-router-dom';
import isAuth from '../services/isAuth';

const PrivateRoute = () => {
    const location = useLocation();

    const checkIsAuth = () => {
        const auth = isAuth();
        console.log('Is Augh In Route: ', auth);
        return auth;
    }
    
    return (
        checkIsAuth() ? <Outlet /> : <Navigate to="/" state={{ from: location }} />
    );
}

export default PrivateRoute;