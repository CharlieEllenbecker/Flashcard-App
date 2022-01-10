import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSelectedFolder } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';

const Folder = () => {
	const [showDecks, setShowDecks] = useState(false);
	const { selectedFolder } = useSelector((state) => state.folderReducer);
	const dispatch = useDispatch();
    const { id } = useParams();

    const fetchFolder = async () => {
		await axios
			.get(`/api/folders/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Folder Response: ', response);
                dispatch(setSelectedFolder(response.data));
			})
			.catch(error => console.error('Error: ', error.response.data));	// add error message?
	}

	useEffect(() => {
		fetchFolder();
		setShowDecks(selectedFolder.decks.length > 0);
	}, [selectedFolder.decks.length]);

	return(
		<>
			<PrivateNavbar />
			<Page title={selectedFolder.name} description={selectedFolder.description}>
				{showDecks ?
					<div className="card-grid">
						{selectedFolder.decks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
					</div> :
					<h2>No Decks In This Folder!</h2>}	{/* TODO: make nicer (maybe add an add deck button) */}
			</Page>
		</>
	);
}

export default Folder;