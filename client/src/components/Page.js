import { Container } from 'react-bootstrap';

const Page = ({ title, children }) => {
    return (
        <>
            <Container fluid>
                <h1>{title}</h1>
                {children}
            </Container>
        </>
    );
}

export default Page