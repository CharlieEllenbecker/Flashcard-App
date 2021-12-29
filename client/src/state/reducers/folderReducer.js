import ActionTypes from '../actions/actionTypes';

const initailState = {
    folders: [],
    newFolder: {},
    selectedFolderDecks: [] // make into selected folder instead as it may be good to contain more data (fix backend first)
};

const folderReducer = (state = initailState, { type, payload }) => {
    switch(type) {
        case ActionTypes.SET_FOLDERS:
            return {
                ...state,
                folders: payload
            };
        case ActionTypes.ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, payload]
            };
        case ActionTypes.SET_SELECTED_FOLDER_DECKS:
            return {
                ...state,
                selectedFolderDecks: payload
            };
        default:
            return state;
    }
}

export default folderReducer;