import Folders from './Folders';
import Decks from './Decks';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard Page</h1>
			<Folders canAddFolder={false}/>
			<Decks />
		</div>
	);
}

export default Dashboard;