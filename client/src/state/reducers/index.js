import { combineReducers } from 'redux';
import folderReducer from './folderReducer';
import deckReducer from './deckReducer';

const reducers = combineReducers({
    folderReducer: folderReducer,
    deckReducer: deckReducer
});

export default reducers;