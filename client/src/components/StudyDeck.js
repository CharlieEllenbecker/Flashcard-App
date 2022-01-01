import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedDeck } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import StudyCard from './StudyCard';

const StudyDeck = () => {
    const [hasNextCard, setHasNextCard] = useState(false);
    const [hasPrevCard, setHasPrevCard] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);    // prevent being able to study if there are no cards in the deck (can't click button)
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handlePrevCard = (e) => {
        e.preventDefault();
        setCurrentCardIndex(currentCardIndex - 1);
        currentCardIndex !== 0 ? setHasPrevCard(true) : setHasPrevCard(false);
    }

    const handleNextCard = (e) => {
        e.preventDefault();
        setCurrentCardIndex(currentCardIndex + 1);
        currentCardIndex !== selectedDeck.cards.length - 1 ? setHasNextCard(true) : setHasNextCard(false);
    }

    const fetchDeck = async () => {
        await axios
            .get(`/api/decks/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Get Deck Response: ', response);
                dispatch(setSelectedDeck(response.data));
            })
            .catch(error => console.error('Error: ', error.response.data));
    }

    useEffect(() => {
        fetchDeck();
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