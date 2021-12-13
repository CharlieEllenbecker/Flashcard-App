import Folders from './Folders';
import Decks from './Decks';
import CustomNavbar from './CustomNavbar';

const Home = () => {
	return (
		<>
			<CustomNavbar />
			<h1>Home Page</h1>
			<Decks displayNavbar={false}/>
			<Folders displayNavbar={false} canAddFolder={false}/>
		</>
	);
}

export default Home;