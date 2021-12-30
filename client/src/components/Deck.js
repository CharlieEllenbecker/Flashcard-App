import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSelectedDeck } from '../state/actions/deckActions';
import Page from './Page';
import PrivateNavbar from'./PrivateNavbar';
import Card from './Card';

const Deck = () => {
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
    }, [])

    return(
        <>
            <PrivateNavbar />
            <Page title={selectedDeck.name} description={selectedDeck.description}>
                {selectedDeck.cards.length > 0 ?
                    <div>
                        {selectedDeck.cards.map((c, i) => <Card key={c._id} index={i} deckId={selectedDeck._id} cardId={c._id} front={c.front} back={c.back} />)}
                    </div> :
                    <h2>No Cards in this Deck!</h2>}	{/* TODO: make nicer (maybe add an edit deck button) */}
            </Page>
        </>
    );
}

export default Deck;