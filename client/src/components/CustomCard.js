import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const CustomCard = ({ type, img, id, name, description, }) => {
	const navigate = useNavigate();

	// Synchronous code
	let buttonMessage;
	if(type === 'folder') {
		buttonMessage = 'Open Folder';
	} else if(type === 'deck') {
		buttonMessage = 'Open Deck';
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
					<Button variant="primary" onClick={handleNavigate}>{buttonMessage}</Button>
				</Card.Body>
			</Card>
		</div>
	);
}

export default CustomCard;