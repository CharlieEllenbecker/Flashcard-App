import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSelectedDeck, setCurrentCardIndex } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import StudyCard from './StudyCard';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const StudyDeck = () => {
    const [hasNextCard, setHasNextCard] = useState(false);
    const [hasPrevCard, setHasPrevCard] = useState(false);
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    const { currentCardIndex } = useSelector((state) => state.deckReducer);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePrevCard = (e) => {
        e.preventDefault();
        dispatch(setCurrentCardIndex(currentCardIndex - 1));
    }

    const handleNextCard = (e) => {
        e.preventDefault();
        dispatch(setCurrentCardIndex(currentCardIndex + 1));
    }

    const handleBackToDeck = (e) => {
        e.preventDefault();
        navigate(`/decks/${id}`);
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
                <div className="center right">
                    <Button variant="primary" onClick={handleBackToDeck}>Back To Deck</Button>
                </div>
                <div className="center">
                    <Button className="side-buttons" variant={hasPrevCard ? "primary" : "secondary"} onClick={handlePrevCard} disabled={!hasPrevCard}>
                        <FaArrowLeft />
                    </Button>
                    {selectedDeck.cards.length !== 0 && <StudyCard
                        key={selectedDeck.cards[currentCardIndex]._id}
                        index={currentCardIndex} deckId={id}
                        cardId={selectedDeck.cards[currentCardIndex]._id}
                        front={selectedDeck.cards[currentCardIndex].front}
                        back={selectedDeck.cards[currentCardIndex].back} />}
                    <Button className="side-buttons" variant={hasNextCard ? "primary" : "secondary"} onClick={handleNextCard} disabled={!hasNextCard}>
                        <FaArrowRight />    
                    </Button>
                </div>
            </Page>
        </>
    );
}

export default StudyDeck;