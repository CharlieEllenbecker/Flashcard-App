import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicHome from './PublicHome';
import Dashboard from './Dashboard';
import Decks from './Decks';
import Folders from './Folders';
import Private from './Private';
import PrivateRoute from './PrivateRoute';
import isAuth from '../services/isAuth';

const App = () => {
  return (
	<>
	  	<BrowserRouter>
			<Routes>
				<Route path="/dashboard" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route exact path="/dashboard" element={<Dashboard />} />
				<Route exact path="/" element={<PublicHome />} />
				<Route path="/decks" element={<Decks displayNavbar={true} />} />
				<Route path="/folders" element={<Folders displayNavbar={true} canAddFolder={true} />} />
				<Route path="/private" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route path="/private" element={<Private />} />
				</Route>
				<Route path="*" element={() => "404 NOT FOUND"} />	{/* TODO: Make into a redirect? */}
			</Routes>
	  	</BrowserRouter>
	</>
  );
}

export default App;