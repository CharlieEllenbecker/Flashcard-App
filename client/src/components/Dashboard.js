import Folders from './Folders';
import Decks from './Decks';
import PrivateNavbar from './PrivateNavbar';

const Dashboard = () => {
	return (
		<>
			<PrivateNavbar />
			<h1>Dashboard Page</h1>
			<Decks displayNavbar={false}/>
			<Folders displayNavbar={false} canAddFolder={false}/>
		</>
	);
}

export default Dashboard;