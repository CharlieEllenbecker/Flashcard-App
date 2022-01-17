import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAvaliableDeck } from '../state/actions/folderActions';

const AddDeck = ({ index, name, isAdded }) => {
    const dispatch = useDispatch();

    const handleChangeAdded = () => {
        dispatch(setAvaliableDeck({
            index: index,
            isAdded: !isAdded
        }));
    }

    return (
        <>
            <Container className="border border-primary rounded light-margin center">
                <div className="card-text right-vertical-bar">{name}</div>
                <div className="card-text center right">
                    <Button variant="primary" onClick={handleChangeAdded}>{isAdded ? '-' : '+'}</Button>
                </div>
            </Container>
        </>
    );
}

export default AddDeck;