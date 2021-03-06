import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setEditDeck, setEditDeckName, setEditDeckDescription, addEditDeckCard, clearEditDeck } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';
import EditCard from './EditCard';
import LoadingSpinner from './LoadingSpinner';

const EditDeck = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [canDeleteCard, setCanDeleteCard] = useState(false);
    const { editDeck } = useSelector((state) => state.deckReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const addEmptyCard = () => {
        dispatch(addEditDeckCard({
            front: null,
            back: null
        }));
    }

    const addStartingCards = () => {
        if(editDeck.cards.length === 0) {
            addEmptyCard();
            addEmptyCard();
        }
        setCanDeleteCard(editDeck.cards.length > 2);
    }

    const handleBackToDeck = (e) => {
        e.preventDefault();
        navigate(`/decks/${id}`);
    }

    const handleAddEditDeckCard = (e) => {
        e.preventDefault();
        addEmptyCard();
    }

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'name') {
            dispatch(setEditDeckName(e.target.value));
        } else if(e.target.name === 'description') {
            dispatch(setEditDeckDescription(e.target.value));
        }
    }

    const handleSaveDeck = (e) => {
        e.preventDefault();
        location.pathname === '/decks/new' ? createDeck() : updateDeck();
    }

    const fetchEditDeck = async () => {
        setIsLoading(true);
        await axios
            .get(`/api/decks/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                setIsLoading(false);
                console.log('Get Edit Deck Response: ', response);
                dispatch(setEditDeck(response.data));
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    const createDeck = async () => {
        setIsLoading(true);
        await axios
            .post('/api/decks', {
                name: editDeck.name,
                description: editDeck.description,
                cards: editDeck.cards
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                setIsLoading(false);
                console.log('Create Deck Response: ', response);
                dispatch(clearEditDeck());
                navigate(`/decks/${id}`);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    const updateDeck = async () => {
        setIsLoading(true);
        await axios
            .put(`/api/decks/${id}`, {
                name: editDeck.name,
                description: editDeck.description,
                cards: editDeck.cards.map(({ _id, ...rest }) => rest)
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                setIsLoading(false);
                console.log('Update Deck Response: ', response);
                dispatch(clearEditDeck());
                navigate(`/decks/${id}`);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    useEffect(() => {
        const tempIsNew = location.pathname === '/decks/new';
        setIsNew(tempIsNew);
        tempIsNew ? addStartingCards() : fetchEditDeck();
    }, []);

    return(
        <>
            <PrivateNavbar />
            <Page title={isNew ? "New Deck Page" : "Edit Deck Page"}>
                {isLoading ?
                    <LoadingSpinner /> :
                    <>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Deck Name</Form.Label>
                                <Form.Control id="deck-name" name="name" type="text" defaultValue={editDeck.name} placeholder="Enter Name" onChange={handleChange} />
                                <Form.Label>Deck Description</Form.Label>
                                <Form.Control id="deck-description" name="description" type="text" defaultValue={editDeck.description} placeholder="Enter Description (optional)" onChange={handleChange} />
                            </Form.Group>
                        </Form>
                        <span>Cards</span>
                        {editDeck.cards.map((c, i) => <EditCard key={i} index={i} front={c.front} back={c.back} canDelete={canDeleteCard} />)}
                        <div className="center light-padding" fluid>
                            <Button variant="primary" onClick={handleAddEditDeckCard}>Add Card</Button>
                        </div>
                    </>}
            </Page>
            <div className="center light-padding" fluid>
                <Button variant="danger" onClick={handleBackToDeck}>Cancel</Button>
                <Button variant="success" onClick={handleSaveDeck}>Save Deck</Button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default EditDeck;