import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setDecks } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';
import '../styles/styles.css';

const AllDecks = ({ showNavbar }) => {
	const { decks } = useSelector((state) => state.deckReducer);
	const dispatch = useDispatch();

	const fetchDecks = async () => {
		await axios
			.get('/api/decks', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Decks Response: ', response);
				dispatch(setDecks(response.data));
			})
			.catch(error => console.error('Error: ', error.response.data));
	}

	useEffect(() => {
		fetchDecks();
	}, []);

	return(
		<>
			{showNavbar && <PrivateNavbar />}
			<Page title="Decks">
				<div className="card-grid">
					{decks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
				</div>
			</Page>
		</>
	);
}

export default AllDecks;