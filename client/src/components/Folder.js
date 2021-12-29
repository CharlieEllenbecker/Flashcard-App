import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { setSelectedFolderDecks } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';

const Folder = () => {
	const [showDecks, setShowDecks] = useState(false);
	const { selectedFolderDecks } = useSelector((state) => state.folderReducer);
	const dispatch = useDispatch();
    const { id } = useParams();

    const fetchFolderDecks = async () => {
		await axios
			.get(`/api/folders/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Decks From Folder Response: ', response);
                dispatch(setSelectedFolderDecks(response.data));
			})
			.catch(error => console.error('Error: ', error.response.data));	// add error message?s
	}

	useEffect(() => {
		fetchFolderDecks();
		setShowDecks(selectedFolderDecks.length > 0);
	}, [selectedFolderDecks.length]);

	return(
		<>
			<PrivateNavbar />
			<Page title="Particular Folder">	{/* TODO: This should have the folder name as well (backend problem? or quick hack with useParam...) */}
				{showDecks ?
					<div className="card-grid">
						{selectedFolderDecks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
					</div> :
					<h2>No Decks In This Folder!</h2>}	{/* TODO: make nicer (maybe add an add deck button) */}
			</Page>
		</>
	);
}

export default Folder;