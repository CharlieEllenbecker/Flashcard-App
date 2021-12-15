import Folders from './Folders';
import Decks from './Decks';
import CustomNavbar from './CustomNavbar';

const Dashboard = () => {
	return (
		<>
			<CustomNavbar />
			<h1>Dashboard Page</h1>
			<Decks displayNavbar={false}/>
			<Folders displayNavbar={false} canAddFolder={false}/>
		</>
	);
}

export default Dashboard;