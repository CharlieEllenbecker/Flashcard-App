import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setEditDeck, setEditDeckName, setEditDeckDescription, addEditDeckCard, clearEditDeck } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';
import EditCard from './EditCard';

const EditDeck = () => {
    const [isNew, setIsNew] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [canDeleteCard, setCanDeleteCard] = useState(false);
    const { editDeck } = useSelector((state) => state.deckReducer);
    const dispatch = useDispatch();
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

    const fetchEditDeck = async () => {
        await axios
            .get(`/api/decks/${id}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Get Edit Deck Response: ', response);
                dispatch(setEditDeck(response.data));              
            })
            .catch(error => {
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    const postDeck = async () => {
        await axios
            .post('/api/decks', {
                name: editDeck.name,
                description: editDeck.description,
                cards: editDeck.cards
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Create Deck Response: ', response);
                dispatch(clearEditDeck());
            })
            .catch(error => {
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    useEffect(() => {
        const tempIsNew = location.pathname === '/decks/new';
        setIsNew(tempIsNew);
        tempIsNew ? addStartingCards() : fetchEditDeck();
    }, [])

    return(
        <>
            <PrivateNavbar />
            <Page title={isNew ? "New Deck Page" : "Edit Deck Page"}>
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
                <Container className="center-add-card-button" fluid>
                    <Button variant="primary" onClick={handleAddEditDeckCard}>Add Card</Button>
                </Container>
            </Page>
            <Container className="move-create-deck-button-right" fluid>
                <Button variant="success" onClick={postDeck}>Create Deck</Button>
            </Container>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default EditDeck;