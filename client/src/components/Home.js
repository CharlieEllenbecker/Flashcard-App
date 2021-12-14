import Folders from './Folders';
import Decks from './Decks';
import CustomNavbar from './CustomNavbar';

import PrivateRoute from './PrivateRoute';
import Private from './Private';
import { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = () => {
	const [isAuth, setIsAuth] = useState(false);

	return (
		<>
			{/* <CustomNavbar /> */}
			<h1>Home Page</h1>

			<BrowserRouter>
				<button onClick={() => {setIsAuth(true)}}>Login</button>
				<button onClick={() => {setIsAuth(false)}}>Logout</button>
				<PrivateRoute component={Private} redirectTo="/" isAuth={isAuth} path="/private" />
				<Link to="/private">Go to private page</Link>
			</BrowserRouter>
			
			{/* <Decks displayNavbar={false}/>
			<Folders displayNavbar={false} canAddFolder={false}/> */}
		</>
	);
}

export default Home;