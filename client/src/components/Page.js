import { Container } from 'react-bootstrap';

const Page = ({ title, description, children }) => {
    return (
        <>
            <Container fluid>
                <h1>{title}</h1>
                <span>{description}</span>
                {children}
            </Container>
        </>
    );
}

export default Page