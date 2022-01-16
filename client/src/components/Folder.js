import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSelectedFolder, setAvaliableDecks, addSelectedFolderDeck } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';
import LoadingSpinner from './LoadingSpinner';
import AddDeck from './AddDeck';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const Folder = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showDecks, setShowDecks] = useState(false);
	const [showConfirmDelete, setShowDeleteModal] = useState(false);
	const [showAddDecks, setShowAddDecks] = useState(false);
	const { selectedFolder } = useSelector((state) => state.folderReducer);
	const { avaliableDecks } = useSelector((state => state.folderReducer));
	const dispatch = useDispatch();
    const { id } = useParams();

	const handleShowConfirmDelete = () => setShowDeleteModal(true);
	const handleCloseConfirmDelete = () => setShowDeleteModal(false);
	const handleShowAddDecks = () => setShowAddDecks(true);
	const handleCloseAddDecks = () => setShowAddDecks(false);

	const handleAddDecks = (e) => {
		e.preventDefault();
		handleCloseAddDecks();
		setIsLoading(true);
		let decks = avaliableDecks.filter(ad => ad.isAdded);
		decks = decks.map(({ isAdded, ...rest }) => rest);
		decks.forEach(d => d.cards = d.cards.map(({ _id, ...rest }) => rest));
		decks.forEach(d => d.folderId = selectedFolder._id);
		decks.forEach(d => addDeck(d));
		setIsLoading(false);
	}

	const addDeck = async ({ _id, ...rest}) => {
		await axios
			.put(`/api/decks/${_id}`, rest, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Put Deck Response: ', response);
				dispatch(addSelectedFolderDeck(response.data));
			})
			.catch(error => {
				console.error('Error: ', error.response.data);	// TODO: add error message to the page?
			});
	}

	const fetchFolderlessDecks = async () => {
		await axios
			.get('/api/decks', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Decks Response: ', response);
				let decks = response.data.filter(d => d.folderId === undefined);
				decks = decks.map(d => ({ ...d, isAdded: false }));
				dispatch(setAvaliableDecks(decks));
			})
			.catch(error => {
				console.error('Error: ', error.response.data);	// TODO: add error message to the page?
			});
	}

    const fetchFolder = async () => {
		setIsLoading(true);
		await axios
			.get(`/api/folders/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				setIsLoading(false);
				console.log('Get Folder Response: ', response);
                dispatch(setSelectedFolder(response.data));
			})
			.catch(error => {
				setIsLoading(false);
				console.error('Error: ', error.response.data);	// TODO: add error message to the page?
			});
	}

	useEffect(() => {
		fetchFolder();
		fetchFolderlessDecks();
	}, []);

	useEffect(() => {
		setShowDecks(selectedFolder.decks.length > 0);
	}, [selectedFolder.decks.length]);

	return(
		<>
			<PrivateNavbar />
			{isLoading ?
				<LoadingSpinner /> :
				<>
					<Page title={selectedFolder.name} description={selectedFolder.description}>
						<div className="center right">
							<Button variant="primary" onClick={handleShowAddDecks}>Add Decks</Button>
							<Button variant="danger" onClick={handleShowConfirmDelete}>Delete Folder</Button>
						</div>
						<br/>
						{showDecks ?
							<div className="card-grid">
								{selectedFolder.decks.map((d, i) => <CustomCard key={d._id} index={i} type="deck" img={deck} id={d._id} name={d.name} description={d.description} cards={d.cards} showDeleteDeck={true} />)}
							</div> :
							<h2>No Decks In This Folder!</h2>}

						<Modal
							show={showAddDecks}
							onHide={handleCloseAddDecks}
						>
							<Modal.Header closeButton>
								<Modal.Title>Select the decks to be added to the folder</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{avaliableDecks.map((ad, i) => <AddDeck key={ad._id} index={i} name={ad.name} isAdded={ad.isAdded} />)}
								<Button variant="primary" onClick={handleCloseAddDecks}>Cancel</Button>
								<Button variant="success" onClick={handleAddDecks}>Add Decks</Button>
							</Modal.Body>
						</Modal>

						<ConfirmDeleteModal type="folder" handleClose={handleCloseConfirmDelete} shouldShow={showConfirmDelete} />
					</Page>
				</>}
		</>
	);
}

export default Folder;