import { Container, Row, Col } from "react-bootstrap";

const Card = ({ index, front, back }) => {
    
    return(
        <>
            <Container className="center-card" fluid>
                <Container className="border border-primary rounded light-margin">

                    <Row>
                        <Col className="right-vertical-bar">
                            {front}
                        </Col>
                        <Col>
                            {back}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Card;