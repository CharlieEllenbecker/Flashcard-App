import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDecks } from '../state/actions/deckActions';
import CustomCard from './CustomCard';
import axios from 'axios';
import deck from '../images/deck.png';
import '../styles/cards.css';

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
			<h1>Decks</h1>
			<div className="card-grid">
				{decks.map(d => <CustomCard key={d._id} name={d.name} description={d.description} img={deck} />)}
			</div>
		</>
	);
}

export default Decks;