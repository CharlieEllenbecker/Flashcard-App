import { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteCardFromSelectedDeck } from '../state/actions/deckActions';
import CardForm from './CardForm';

const Card = ({ index, deckId, cardId, front, back }) => {
    const [showEditCard, setShowEditCard] = useState(false);
    const dispatch = useDispatch();

    const handleOpenCardModal = () => setShowEditCard(true);
    const handleCloseCardModal = () => setShowEditCard(false);

    const handleDeleteCard = async (e) => { // fix so that this endpoint returns the deleted card and add actions to redux
        e.preventDefault();

        await axios
            .delete(`/api/cards/${deckId}/${cardId}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Delete Card Response: ', response);
                dispatch(deleteCardFromSelectedDeck(index));
            })
            .catch(error => console.error('Error: ', error.response.data));
    }
    
    return(
        <>
            <Container className="center-card" fluid>
                <Container className="border border-primary rounded light-margin">
                    <Row>
                        <Col className="right-vertical-bar">
                            {front}
                        </Col>
                        <Col className="right-vertical-bar">
                            {back}
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={handleDeleteCard}>Delete</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={handleOpenCardModal}>Edit</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Modal
                show={showEditCard}
                onHide={handleCloseCardModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardForm handleCloseModal={handleCloseCardModal} deckId={deckId} cardId={cardId} index={index} currentFront={front} currentBack={back} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Card;