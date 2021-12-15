import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth, redirectTo }) => {
    const location = useLocation();

    return isAuth ? <Outlet /> : <Navigate to={redirectTo} state={{ from: location }} />;
}

export default PrivateRoute;

/*
    Something about editing the history of the location and making back arrow not go back to the signup page...
*/