import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSelectedDeck, setCurrentCardIndex } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import StudyCard from './StudyCard';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const StudyDeck = () => {
    const [hasNextCard, setHasNextCard] = useState(false);
    const [hasPrevCard, setHasPrevCard] = useState(false);
    const { isStudying } = useSelector((state) => state.deckReducer);
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    const { currentCardIndex } = useSelector((state) => state.deckReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const handlePrevCard = (e) => {
        e.preventDefault();
        dispatch(setCurrentCardIndex(currentCardIndex - 1));
    }

    const handleNextCard = (e) => {
        e.preventDefault();
        dispatch(setCurrentCardIndex(currentCardIndex + 1));
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
        setHasPrevCard(currentCardIndex > 0);
        setHasNextCard(currentCardIndex < selectedDeck.cards.length - 1);
    }, [currentCardIndex]);

    return(
        <>
            <PrivateNavbar />
            <Page title={selectedDeck.name} description={selectedDeck.description}>
                <div className="center">
                    {hasPrevCard &&
                        <Button className="side-buttons" variant="primary" onClick={handlePrevCard}>
                            <FaArrowLeft />
                        </Button>}
                    {selectedDeck.cards.length !== 0 && <StudyCard
                        key={selectedDeck.cards[currentCardIndex]._id}
                        index={currentCardIndex} deckId={id}
                        cardId={selectedDeck.cards[currentCardIndex]._id}
                        front={selectedDeck.cards[currentCardIndex].front}
                        back={selectedDeck.cards[currentCardIndex].back} />}
                    {hasNextCard &&
                        <Button className="side-buttons" variant="primary" onClick={handleNextCard}>
                            <FaArrowRight />    
                        </Button>}
                </div>
            </Page>
        </>
    );
}

export default StudyDeck;