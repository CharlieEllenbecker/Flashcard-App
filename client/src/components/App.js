import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicHome from './PublicHome';
import Dashboard from './Dashboard';
import AllDecks from './AllDecks';
import AllFolders from './AllFolders';
import NewDeck from './NewDeck';
import Folder from './Folder';
import isAuth from '../services/isAuth';

const App = () => {
  return (
	<>
	  	<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<PublicHome />} />
				<Route path="/dashboard" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="/folders" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/folders" element={<AllFolders showNavbar={true} />} />
				</Route>
				<Route path="/decks" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/decks" element={<AllDecks showNavbar={true} />} />
				</Route>
				<Route path="/new-deck" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}> {/* TODO: for edit deck, new deck is not the way to go, param is probably needed */}
						<Route exact path="/new-deck" element={<NewDeck />} />
				</Route>
				<Route path="/folders/:id" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/folders/:id" element={<Folder />} />
				</Route>
				<Route path="*" element={() => "404 NOT FOUND"} />	{/* TODO: Make into a redirect? */}
			</Routes>
	  	</BrowserRouter>
	</>
  );
}

export default App;