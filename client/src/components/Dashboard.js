import AllFolders from './AllFolders';
import AllDecks from './AllDecks';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';

const Dashboard = () => {
	return (
		<>
			<PrivateNavbar />
			<Page title="Dashboard">
				<AllDecks showNavbar={false} />
				<AllFolders showNavbar={false} />
			</Page>
		</>
	);
}

export default Dashboard;