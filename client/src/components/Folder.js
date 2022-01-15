import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSelectedFolder, deleteSelectedFolder, setAvaliableDecks, setAnAvaliableDeck } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';
import LoadingSpinner from './LoadingSpinner';
import AddDeck from './AddDeck';

const Folder = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showDecks, setShowDecks] = useState(false);
	const [showConfirmDelete, setShowDeleteModal] = useState(false);
	const [showAddDecks, setShowAddDecks] = useState(false);
	const { selectedFolder } = useSelector((state) => state.folderReducer);
	const { avaliableDecks } = useSelector((state => state.folderReducer));
	const dispatch = useDispatch();
    const { id } = useParams();
	const navigate = useNavigate();

	const handleShowConfirmDelete = () => setShowDeleteModal(true);
	const handleCloseConfirmDelete = () => setShowDeleteModal(false);
	const handleShowAddDecks = () => setShowAddDecks(true);
	const handleCloseAddDecks = () => setShowAddDecks(false);

	const handleDeleteFolder = async (e) => {
		e.preventDefault();
		handleCloseConfirmDelete();
		await axios
			.delete(`/api/folders/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Delete Folder Response: ', response);
				dispatch(deleteSelectedFolder());
				navigate('/dashboard');
			})
			.catch(error => {
				console.error('Error: ', error.response.data);
			});
	}

	const fetchFolderlessDecks = async () => {
		await axios
			.get('/api/decks', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Decks Response: ', response);
				let decks = response.data.filter(d => !d.folderId !== undefined);
				decks = decks.map(d => ({ ...d, added: false }));
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
		console.log('Here');
		fetchFolder();
		setShowDecks(selectedFolder.decks.length > 0);
		fetchFolderlessDecks();
	}, [selectedFolder.decks.length]);

	return(
		<>
			<PrivateNavbar />
			{isLoading ?
				<LoadingSpinner /> :
				<>
					<Page title={selectedFolder.name} description={selectedFolder.description}>
						<div className="center right">
							<Button variant="danger" onClick={handleShowConfirmDelete}>Delete</Button>
						</div>
						<br/>
						{showDecks ?
							<div className="card-grid">
								{selectedFolder.decks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
							</div> :
							<h2>No Decks In This Folder!</h2>}	{/* TODO: make nicer (maybe add an add deck button) */}
						<div className="center">
							<Button variant="primary" onClick={handleShowAddDecks}>Add Decks</Button>
						</div>

						<Modal
							show={showAddDecks}
							onHide={handleCloseAddDecks}
						>
							<Modal.Header closeButton>
								<Modal.Title>Are you sure you want to delete this folder?</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{avaliableDecks.map((ad, i) => <AddDeck index={i} name={ad.name} />)}
								<Button variant="primary" onClick={handleCloseAddDecks}>Cancel</Button>
								<Button variant="success" onClick={handleAddDecks}>Add Decks</Button>
							</Modal.Body>
						</Modal>

						<Modal	// TODO: make this delete modal and the delete deck modal as one component
							show={showConfirmDelete}
							onHide={handleCloseConfirmDelete}
						>
							<Modal.Header closeButton>
								<Modal.Title>Are you sure you want to delete this folder?</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Button variant="primary" onClick={handleCloseConfirmDelete}>Cancel</Button>
								<Button variant="danger" onClick={handleDeleteFolder}>Delete</Button>
							</Modal.Body>
						</Modal>
					</Page>
				</>}
		</>
	);
}

export default Folder;