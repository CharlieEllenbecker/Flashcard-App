import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const StudyCard = ({ index, deckId, cardId, front, back }) => {
    const [showFront, setShowFront] = useState(true);

    const handleFlip = (e) => {
        e.preventDefault();
        setShowFront(!showFront);
    }

    return(
        <>
            <Container className="center-card" fluid>
                <Container className="border border-primary rounded light-margin">
                    {showFront ? front : back}
                    <Button variant="primary" onClick={handleFlip}>Flip</Button>
                </Container>
            </Container>
        </>
    );
}

export default StudyCard;