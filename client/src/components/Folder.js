import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSelectedFolder, deleteSelectedFolder } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
import Page from './Page';
import deck from '../images/deck.png';
import LoadingSpinner from './LoadingSpinner';

const Folder = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showDecks, setShowDecks] = useState(false);
	const [showConfirmDelete, setShowDeleteModal] = useState(false);
	const { selectedFolder } = useSelector((state) => state.folderReducer);
	const dispatch = useDispatch();
    const { id } = useParams();
	const navigate = useNavigate();

	const handleShowConfirmDelete = () => setShowDeleteModal(true);
	const handleCloseConfirmDelete = () => setShowDeleteModal(false);

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
							<Button variant="danger" onClick={handleShowConfirmDelete}>Delete</Button>
						</div>
						<br/>
						{showDecks ?
							<div className="card-grid">
								{selectedFolder.decks.map(d => <CustomCard key={d._id} type="deck" img={deck} id={d._id} name={d.name} description={d.description} />)}
							</div> :
							<h2>No Decks In This Folder!</h2>}	{/* TODO: make nicer (maybe add an add deck button) */}

						<Modal
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