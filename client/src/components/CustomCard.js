import { Card, Button } from 'react-bootstrap';
import '../styles/cards.css';

const CustomCard = (props) => {
	if(!props.name) {
		return null;
	}
	else {
		return(
			<div className="custom-card">
				<Card>
					<Card.Img variant="top" src={props.img} />
					<Card.Body>
						<Card.Title>{props.name}</Card.Title>
						<Card.Text>{props.description}</Card.Text>
						<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default CustomCard;