import { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteCardFromSelectedDeck } from '../state/actions/deckActions';
import CardForm from './CardForm';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const Card = ({ index, deckId, cardId, front, back }) => {
    const [showEditCard, setShowEditCard] = useState(false);
    const dispatch = useDispatch();

    const handleOpenCardModal = () => setShowEditCard(true);
    const handleCloseCardModal = () => setShowEditCard(false);

    const handleDeleteCard = async (e) => {
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
            <div className="center-card">
                <Container className="border border-primary rounded light-margin flashcard">
                    <div className="front right-vertical-bar">{front}</div>
                    <div className="back">{back}</div>
                    <div className="side-buttons">
                        <div className="edit">
                            <Button variant="primary" onClick={handleDeleteCard}>
                                <FaRegTrashAlt />
                            </Button>
                        </div>
                        <div className="delete">
                            <Button variant="primary" onClick={handleOpenCardModal}>
                                <FaRegEdit />
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

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