import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { BsArrowRepeat } from 'react-icons/bs';

const StudyCard = ({ index, deckId, cardId, front, back }) => {
    const [showFront, setShowFront] = useState(true);

    const handleFlip = (e) => {
        e.preventDefault();
        setShowFront(!showFront);
    }

    return(
        <>
            <Container className="center-card" fluid>
                <Container className="border border-primary rounded light-margin flashcard study-card center">
                    {showFront ?
                        <div className="front right-vertical-bar">{front}</div> :
                        <div className="back right-vertical-bar">{back}</div>}
                    <Button variant="primary" onClick={handleFlip}>
                        <BsArrowRepeat />
                    </Button>
                </Container>
            </Container>
        </>
    );
}

export default StudyCard;