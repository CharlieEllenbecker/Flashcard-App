import { combineReducers } from 'redux';
import foldersReducer from './foldersReducer';

const reducers = combineReducers({
    folders: foldersReducer
});

export default reducers;