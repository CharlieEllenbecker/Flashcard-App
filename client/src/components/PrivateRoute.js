import { Navigate, useLocation, Outlet } from 'react-router-dom';
import isAuth from '../services/isAuth';

const PrivateRoute = () => {
    const location = useLocation();
    
    return isAuth() ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}

export default PrivateRoute;