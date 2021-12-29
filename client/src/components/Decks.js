import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDecks } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import axios from 'axios';
import deck from '../images/deck.png';
import '../styles/styles.css';

const Decks = () => {
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
			<PrivateNavbar />
			<Page title="Decks">
				<div className="card-grid">
					{decks.map(d => <CustomCard key={d._id} name={d.name} description={d.description} img={deck} />)}
				</div>
			</Page>
		</>
	);
}

export default Decks;