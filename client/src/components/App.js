import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import Decks from './Decks';
import Folders from './Folders';

const App = () => {
  return (
	<>
	  	<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/decks" element={<Decks displayNavbar={true} />} />
				<Route path="/folders" element={<Folders displayNavbar={true} canAddFolder={true} />} />
				<Route path="*" element={() => "404 NOT FOUND"} />
			</Routes>
	  	</BrowserRouter>
	</>
  );
}

export default App;