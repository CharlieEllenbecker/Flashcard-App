import React, { useEffect, useState } from 'react';
import CustomCard from './CustomCard';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';
import deck from '../images/deck.png';
import '../styles/cards.css';

const Decks = (props) => {
	const [decks, setDecks] = useState([])

	const getDecks = async () => {
		await axios
			.get('/api/decks', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Decks Response: ', response);
				setDecks(response.data);
			})
			.catch(error => console.error('Error: ', error));
	}

	useEffect(() => {
		getDecks();
	}, []);

	return(
		<>
			{props.displayNavbar && <CustomNavbar />}
			<h1>Decks</h1>
			<div className="card-grid">
				{decks.map(d => <CustomCard name={d.name} description={d.description} img={deck} />)}
			</div>
		</>
	);
}

export default Decks;