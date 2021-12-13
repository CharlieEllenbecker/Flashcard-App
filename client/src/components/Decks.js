import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Decks = () => {
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
		<div className="grid-wrapper">
			<h1>Decks</h1>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
					</tr>
				</thead>
				<tbody>
					{decks.map(d =>
					<tr key={d._id}>
						<td>{d.name}</td> 
					</tr>
				)}
				</tbody>
			</table>
		</div>
	);
}

export default Decks;