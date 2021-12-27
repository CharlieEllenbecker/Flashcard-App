import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setNewDeckName, setNewDeckDescription } from '../state/actions/deckActions';
import PrivateNavbar from './PrivateNavbar';

const NewDeck = () => {
    const { newDeck } = useSelector((state) => state.deckReducer);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'name') {
            dispatch(setNewDeckName(e.target.value));
        } else if(e.target.name === 'description') {
            dispatch(setNewDeckDescription(e.target.value));
        }
    }

    return(
        <>
            <PrivateNavbar />
            <h1>New Deck Page</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Deck Name</Form.Label>
                    <Form.Control id="deck-name" name="name" type="text" defaultValue={newDeck.name} placeholder="Enter Name" onChange={handleChange} />
                    <Form.Label>Deck Description</Form.Label>
                    <Form.Control id="deck-description" name="description" type="text" defaultValue={newDeck.description} placeholder="Enter Description (optional)" onChange={handleChange} />
                </Form.Group>
            </Form>
        </>
    );
}

export default NewDeck;