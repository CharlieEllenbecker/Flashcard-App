import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCardFromSelectedDeck } from '../state/actions/deckActions';

const CardForm = ({ handleCloseModal, deckId, cardId, index, currentFront, currentBack }) => {
    const [editCardInput, setEditCardInput] = useState({ front: currentFront, back: currentBack });
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setEditCardInput({...editCardInput, [e.target.name]: e.target.value});
    }

    const clearInputs = () => {
		document.getElementById('card-front').value = '';
		document.getElementById('card-back').value = '';
		setEditCardInput({ front: currentFront, back: currentBack });
	}

    const editCard = async () => {  // fix so that this endpoint returns the edited card and add actions to redux
        await axios
            .put(`/api/cards/${deckId}/${cardId}`, {
                front: editCardInput.front,
                back: editCardInput.back
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Edit Card Response: ', response);
                clearInputs();
                dispatch(setCardFromSelectedDeck({
                    index: index,
                    front: response.data.front,
                    back: response.data.back
                }));
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error: ', error.response.data);
                setErrorMessage(error.response.data);
            });

    }

    return(
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Front</Form.Label>
                    <Form.Control id="card-front" name="front" type="text" defaultValue={currentFront} placeholder="Enter Front" onChange={handleChange} />
                    <Form.Label>Back</Form.Label>
                    <Form.Control id="card-back" name="back" type="text" defaultValue={currentBack} placeholder="Enter Back" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={editCard}>
                    Save Changes
                </Button>
            </Form>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default CardForm;