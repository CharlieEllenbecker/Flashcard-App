import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedDeck } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { FaEdit } from 'react-icons/fa';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const Deck = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleShowConfirmDelete = () => setShowConfirmDelete(true);
    const handleCloseConfirmDelete = () => setShowConfirmDelete(false);

    const handleNavigateToEditDeck = (e) => {
        e.preventDefault();
        navigate(`/decks/edit/${id}`);
    }

    const handleNavigateToStudyDeck = (e) => {
        e.preventDefault();
        navigate(`/decks/study/${id}`);
    }

    const fetchDeck = async () => {
        setIsLoading(true);
        await axios
            .get(`/api/decks/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                setIsLoading(false);
                console.log('Get Deck Response: ', response);
                dispatch(setSelectedDeck(response.data));
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error: ', error.response.data); // TODO: add error message to the page?
            });
    }

    useEffect(() => {
        fetchDeck();
    }, []);

    return(
        <>
            <PrivateNavbar />
            {isLoading ?
                <LoadingSpinner /> :
                <>
                    <Page title={selectedDeck.name} description={selectedDeck.description}>
                        <div className="center right">
                            <Button variant="danger" onClick={handleShowConfirmDelete}>Delete Deck</Button>
                        </div>
                        <br/>
                        <div className="deck-properties">
                            <Button variant="primary" onClick={handleNavigateToEditDeck}>
                                <FaEdit />
                            </Button>
                            <Button variant="primary" onClick={handleNavigateToStudyDeck}>Study Deck</Button>
                        </div>
                        {selectedDeck.cards.length > 0 ?
                            <div>
                                {selectedDeck.cards.map((c, i) => <Card key={c._id} index={i} deckId={selectedDeck._id} cardId={c._id} front={c.front} back={c.back} />)}
                            </div> :
                            <h2>No Cards in this Deck!</h2>}

                        <ConfirmDeleteModal type="deck" handleClose={handleCloseConfirmDelete} shouldShow={showConfirmDelete} />
                    </Page>
                </>}
        </>
    );
}

export default Deck;