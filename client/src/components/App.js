import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicHome from './PublicHome';
import Dashboard from './Dashboard';
import NewDeck from './NewDeck';
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
				<Route path="/newdeck" element={<PrivateRoute isAuth={isAuth()} redirectTo="/"/>}>
						<Route exact path="/newdeck" element={<NewDeck />} />
				</Route>
				<Route path="*" element={() => "404 NOT FOUND"} />	{/* TODO: Make into a redirect? */}
			</Routes>
	  	</BrowserRouter>
	</>
  );
}

export default App;