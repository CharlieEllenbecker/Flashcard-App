import { combineReducers } from 'redux';
import folderReducer from './folderReducer';
import deckReducer from './deckReducer';

const reducers = combineReducers({
    folders: folderReducer,
    decks: deckReducer
});

export default reducers;