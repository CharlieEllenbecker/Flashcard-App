import { Card, Button } from 'react-bootstrap';
import flashcards from '../images/flashcards.png';

const Deck = () => {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={flashcards} />
            <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>Description</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default Deck;