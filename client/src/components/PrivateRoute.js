import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth, redirectTo }) => {
    const location = useLocation();

    return isAuth ? <Outlet /> : <Navigate to={redirectTo} state={{ from: location }} />;
}

export default PrivateRoute;