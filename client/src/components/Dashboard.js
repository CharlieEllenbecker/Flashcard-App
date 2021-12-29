import Folders from './Folders';
import Decks from './Decks';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';

const Dashboard = () => {
	return (
		<>
			<PrivateNavbar />
			<Page title="Dashboard">
				<Decks />
				<Folders />
			</Page>
		</>
	);
}

export default Dashboard;