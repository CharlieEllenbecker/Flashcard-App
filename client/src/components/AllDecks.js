import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setDecks } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';
import LoadingSpinner from './LoadingSpinner';
import '../styles/styles.css';

const AllDecks = ({ showNavbar }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { decks } = useSelector((state) => state.deckReducer);
	const dispatch = useDispatch();

	const fetchDecks = async () => {
		setIsLoading(true);
		await axios
			.get('/api/decks', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				setIsLoading(false);
				console.log('Get Decks Response: ', response);
				dispatch(setDecks(response.data));
			})
			.catch(error => {
				setIsLoading(false);
				console.error('Error: ', error.response.data);	// TODO: add error message to the page?
			});
	}

	useEffect(() => {
		fetchDecks();
	}, []);

	return(
		<>
			{showNavbar && <PrivateNavbar />}
			<Page title="Decks">
				{isLoading ?
					<LoadingSpinner /> :
					<div className="card-grid">
						{decks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
					</div>}
			</Page>
		</>
	);
}

export default AllDecks;