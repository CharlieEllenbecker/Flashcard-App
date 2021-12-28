import { Form, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editNewDeckCardFront, editNewDeckCardBack } from '../state/actions/deckActions';

const NewCard = ({ tempId, front, back }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'front') {
            dispatch(editNewDeckCardFront({
                tempId: tempId,
                front: e.target.value
            }));
        } else if(e.target.name === 'back') {
            dispatch(editNewDeckCardBack({
                tempId: tempId,
                back: e.target.value
            }));
        }
    }

    return(
        <>
            <Container className="border border-primary">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Front</Form.Label>
                        <Form.Control id="card-front" name="front" type="text" defaultValue={front} placeholder="Enter Front" onChange={handleChange} />
                        <Form.Label>Back</Form.Label>
                        <Form.Control id="deck-description" name="back" type="text" defaultValue={back} placeholder="Enter Back" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default NewCard;