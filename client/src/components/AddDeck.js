import { useState } from 'react';
import { Button } from 'react-bootstrap';

const AddDeck = ({ index, name }) => {
    const [added, setAdded] = useState(false);

    const handleChangeAdded = () => setAdded(!added);

    return (
        <>
            <div className="add-deck">
                <div className="card-text">{name}</div>
                <div className="card-text">
                    <Button variant="primary" onClick={handleChangeAdded}>{added ? '-' : '+'}</Button>
                </div>
            </div>
        </>
    );
}

export default AddDeck;