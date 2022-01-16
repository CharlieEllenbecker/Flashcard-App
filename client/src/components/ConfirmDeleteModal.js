import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSelectedDeck } from '../state/actions/deckActions';
import { deleteSelectedFolder } from '../state/actions/folderActions';
import axios from 'axios';

const ConfirmDeleteModal = ({ type, handleClose, shouldShow }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id} = useParams();

    const handleDeleteDeck = async (e) => {
        e.preventDefault();
        await axios
            .delete(`/api/decks/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Delete Deck Response: ', response);
                dispatch(deleteSelectedDeck());
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error: ', error.response.data);
            });
    }

    const handleDeleteFolder = async (e) => {
		e.preventDefault();
		handleClose();
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

    const handleDelete = (e) => {
        e.preventDefault();
        if(type === "folder") {
            handleDeleteFolder(e);
        } else if(type === "deck") {
            handleDeleteDeck(e);
        }
    }

    return (
        <>
            <Modal
                show={shouldShow}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this {type}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmDeleteModal;