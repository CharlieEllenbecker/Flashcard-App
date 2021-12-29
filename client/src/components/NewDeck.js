import { useState, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setNewDeckName, setNewDeckDescription, addNewDeckCard, clearNewDeck } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';
import NewCard from './NewCard';

const NewDeck = () => {
    const { newDeck } = useSelector((state) => state.deckReducer);
    const [errorMessage, setErrorMessage] = useState(null);
    const [canDeleteCard, setCanDeleteCard] = useState(false);
    const dispatch = useDispatch();

    const addEmptyCard = () => {
        dispatch(addNewDeckCard({
            front: null,
            back: null
        }));
    }

    const addStartingCards = () => {
        if(newDeck.cards.length === 0) {
            addEmptyCard();
            addEmptyCard();
        }
    }

    const handleAddNewDeckCard = (e) => {
        e.preventDefault();

        addEmptyCard();
    }

    const handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'name') {
            dispatch(setNewDeckName(e.target.value));
        } else if(e.target.name === 'description') {
            dispatch(setNewDeckDescription(e.target.value));
        }
    }

    const postDeck = async () => {
        await axios
            .post('/api/decks', {
                name: newDeck.name,
                description: newDeck.description,
                cards: newDeck.cards
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Create Deck Response: ', response);
                dispatch(clearNewDeck());              
            })
            .catch(error => {
                console.error('Error: ', error.response.data)
                setErrorMessage(error.response.data);
            });
    }

    useEffect(() => {
        addStartingCards();
        setCanDeleteCard(newDeck.cards.length > 2);
    }, [newDeck.cards.length]);

    return(
        <>
            <PrivateNavbar />
            <Page title="New Deck Page" >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Deck Name</Form.Label>
                        <Form.Control id="deck-name" name="name" type="text" defaultValue={newDeck.name} placeholder="Enter Name" onChange={handleChange} />
                        <Form.Label>Deck Description</Form.Label>
                        <Form.Control id="deck-description" name="description" type="text" defaultValue={newDeck.description} placeholder="Enter Description (optional)" onChange={handleChange} />
                    </Form.Group>
                </Form>
                <span>Cards</span>
                {newDeck.cards.map((c, i) => <NewCard key={i} index={i} front={c.front} back={c.back} canDelete={canDeleteCard} />)}
                <Container className="center-add-card-button" fluid>
                    <Button variant="primary" onClick={handleAddNewDeckCard}>Add Card</Button>
                </Container>
            </Page>
            <Container className="move-create-deck-button-right" fluid>
                <Button variant="success" onClick={postDeck}>Create Deck</Button>
            </Container>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default NewDeck;