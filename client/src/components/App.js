import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicHome from './PublicHome';
import Dashboard from './Dashboard';
import AllDecks from './AllDecks';
import AllFolders from './AllFolders';
import EditDeck from './EditDeck';
import Folder from './Folder';
import Deck from './Deck';
import StudyDeck from './StudyDeck';

const App = () => {
  return (
	<>
	  	<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<PublicHome />} />
				<Route path="/dashboard" element={<PrivateRoute route="/dashboard" />}>
						<Route exact path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="/folders" element={<PrivateRoute />}>
						<Route exact path="/folders" element={<AllFolders showNavbar={true} />} />
				</Route>
				<Route path="/decks" element={<PrivateRoute />}>
						<Route exact path="/decks" element={<AllDecks showNavbar={true} />} />
				</Route>
				<Route path="/decks/new" element={<PrivateRoute />}>
						<Route exact path="/decks/new" element={<EditDeck />} />
				</Route>
				<Route path="/decks/edit/:id" element={<PrivateRoute />}>
						<Route exact path="/decks/edit/:id" element={<EditDeck />} />
				</Route>
				<Route path="/folders/:id" element={<PrivateRoute />}>
						<Route exact path="/folders/:id" element={<Folder />} />
				</Route>
				<Route path="/decks/:id" element={<PrivateRoute />}>
						<Route exact path="/decks/:id" element={<Deck />} />
				</Route>
				<Route path="/decks/study/:id" element={<PrivateRoute />}>
						<Route exact path="/decks/study/:id" element={<StudyDeck />} />
				</Route>
				<Route path="*" element={() => "404 NOT FOUND"} />	{/* TODO: Make into a redirect? */}
			</Routes>
	  	</BrowserRouter>
	</>
  );
}

export default App;