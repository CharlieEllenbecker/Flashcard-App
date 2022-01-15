import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAnAvaliableDeck } from '../state/actions/folderActions';

const AddDeck = ({ index, name, isAdded }) => {
    const dispatch = useDispatch();

    const handleChangeAdded = () => {
        dispatch(setAnAvaliableDeck({
            index: index,
            isAdded: !isAdded
        }));
    }

    return (
        <>
            <div className="add-deck">
                <div className="card-text right-vertical-bar">{name}</div>
                <div className="card-text">
                    <Button variant="primary" onClick={handleChangeAdded}>{isAdded ? '-' : '+'}</Button>
                </div>
            </div>
        </>
    );
}

export default AddDeck;