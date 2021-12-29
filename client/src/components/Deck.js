import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedDeck } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import Card from './Card';

const Deck = () => {
    const [showCards, setShowCards] = useState(false);
    const { selectedDeck } = useSelector((state) => state.deckReducer);
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
        setShowCards(selectedDeck.cards.length > 0);
    }, [])

    return(
        <>
            <PrivateNavbar />
            <Page title={selectedDeck.name} description={selectedDeck.description}>
                {showCards ?
                    <div>
                        {selectedDeck.cards.map(c => <Card key={c._id} deckId={selectedDeck._id} cardId={c._id} front={c.front} back={c.back} />)}
                    </div> :
                    <h2>No Decks In This Folder!</h2>}	{/* TODO: make nicer (maybe add an edit deck button) */}
            </Page>
        </>
    );
}

export default Deck;