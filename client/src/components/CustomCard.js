import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteSelectedFolderDeck } from '../state/actions/folderActions';
import '../styles/styles.css';

const CustomCard = ({ index, type, img, id, name, description, cards, showDeleteDeck }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let buttonMessage;
	if(type === 'folder') {
		buttonMessage = 'Open Folder';
	} else if(type === 'deck') {
		buttonMessage = 'Open Deck';
	}

	const handleRemoveDeck = async (e) => {
		e.preventDefault();
		await axios
			.put(`/api/decks/from-folder/${id}`, {}, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Put Deck Response: ', response);
				dispatch(deleteSelectedFolderDeck(index));
			})
			.catch(error => {
				console.error('Error: ', error.response.data);
			});
	}

	const handleNavigate = (e) => {
		e.preventDefault();
		if(type === 'folder') {
			navigate(`/folders/${id}`);
		} else if(type === 'deck') {
			navigate(`/decks/${id}`);
		}
	}

	return(
		<div className="light-margin">
			<Card>
				<Card.Img variant="top" src={img} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{description}</Card.Text>
					<div className="center right">
						<Button variant="primary" onClick={handleNavigate}>{buttonMessage}</Button>
						{type === 'deck' && showDeleteDeck &&
							<Button variant="danger" onClick={handleRemoveDeck}>Remove</Button>}
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}

export default CustomCard;