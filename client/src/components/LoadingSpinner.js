import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <div className="center">
            <h1>
                Loading... <Spinner animation="border" />
            </h1>
        </div>
    );
}

export default LoadingSpinner;