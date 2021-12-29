import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedDeck } from '../state/actions/deckActions';
import Page from './Page';
import Card from './Card';

const Deck = () => {
    const { selectedDeck } = useSelector((state) => state.deckReducer);
    console.log(selectedDeck);
    const dispatch = useDispatch();
    const { id } = useParams();

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
    }, [])

    return(
        <>
            <Page title="Particular Deck">
                {selectedDeck.cards.map((c, i) => <Card key={c._id} index={i} front={c.front} back={c.back} />)}
            </Page>
        </>
    );
}

export default Deck;