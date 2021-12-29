import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setSelectedDeck } from "../state/actions/deckActions";

const Card = ({ deckId, cardId, front, back }) => {
    const dispatch = useDispatch();

    const handleDeleteCard = async (e) => {
        e.preventDefault();

        await axios
            .delete(`/api/cards/${deckId}/${cardId}`, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Delete Card Response: ', response);
                dispatch(setSelectedDeck(response.data));
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
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Card;