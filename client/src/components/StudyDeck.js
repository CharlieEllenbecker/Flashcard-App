import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import StudyCard from './StudyCard';

const StudyDeck = () => {
    const [hasNextCard, setHasNextCard] = useState(false);
    const [hasPrevCard, setHasPrevCard] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);    // TODO: prevent being able to study if there are no cards in the deck (can't click button)
    // current card should be stored in redux as a refresh would be detrimental...
    // in this case localstorage would be needed
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    const { id } = useParams();

    const handlePrevCard = (e) => {
        e.preventDefault();
        setCurrentCardIndex(currentCardIndex - 1);
        currentCardIndex !== 0 ? setHasPrevCard(true) : setHasPrevCard(false);
    }

    const handleNextCard = (e) => {
        e.preventDefault();
        
        if(currentCardIndex + 1 !== selectedDeck.cards.length - 1) {
            setHasNextCard(true);
        } else {
            setHasNextCard(false);
        }
        setCurrentCardIndex(currentCardIndex + 1);
    }

    useEffect(() => {
        setHasNextCard(currentCardIndex < selectedDeck.cards.length - 1);  // TODO: will need to be changed with the utilization of redux...
    }, []);

    return(
        <>
            <PrivateNavbar />
            <Page title={selectedDeck.name} description={selectedDeck.description}>
                {hasPrevCard && <Button variant="primary" onClick={handlePrevCard}>Prev</Button>}
                {selectedDeck.cards.length !== 0 && <StudyCard
                    key={selectedDeck.cards[currentCardIndex]._id}
                    index={currentCardIndex} deckId={id}
                    cardId={selectedDeck.cards[currentCardIndex]._id}
                    front={selectedDeck.cards[currentCardIndex].front}
                    back={selectedDeck.cards[currentCardIndex].back} />}
                {hasNextCard && <Button variant="primary" onClick={handleNextCard}>Next</Button>}
            </Page>
        </>
    );
}

export default StudyDeck;