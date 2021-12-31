import { Form, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setEditDeckCardFront, setEditDeckCardBack, deleteEditDeckCard } from '../state/actions/deckActions';

const EditCard = ({ index, front, back, canDelete }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'front') {
            dispatch(setEditDeckCardFront({
                index: index,
                front: e.target.value
            }));
        } else if(e.target.name === 'back') {
            dispatch(setEditDeckCardBack({
                index: index,
                back: e.target.value
            }));
        }
    }

    const handleDeleteCard = (e) => {
        e.preventDefault();

        dispatch(deleteEditDeckCard(index));
    }

    return(
        <>
            <Container className="center-card" fluid>
                <Container className="border border-primary rounded light-margin">
                    <span>{`(${index + 1})`}</span>
                    {canDelete && <Button variant="primary" onClick={handleDeleteCard}>Delete Card</Button>}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Front</Form.Label>
                            <Form.Control id="card-front" name="front" type="text" defaultValue={front} placeholder="Enter Front" onChange={handleChange} />
                            <Form.Label>Back</Form.Label>
                            <Form.Control id="deck-description" name="back" type="text" defaultValue={back} placeholder="Enter Back" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Container>
            </Container>
        </>
    );
}

export default EditCard;