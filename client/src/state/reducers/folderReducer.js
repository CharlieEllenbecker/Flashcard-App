import ActionTypes from '../actions/actionTypes';

const initailState = {
    folders: [],
    selectedFolder: {
        decks: [],
    },
    avaliableDecks: []
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
        case ActionTypes.SET_SELECTED_FOLDER:
            return {
                ...state,
                selectedFolder: payload
            };
        case ActionTypes.ADD_SELECTED_FOLDER_DECK:
            return {
                ...state,
                selectedFolder: {
                    ...state.selectedFolder,
                    decks: [...state.selectedFolder.decks, payload]
                }
            };
        case ActionTypes.DELETE_SELECTED_FOLDER:
            return {
                ...state,
                folders: state.folders.filter(f => f._id !== state.selectedFolder._id),
                selectedFolder: {
                    decks: []
                }
            };
        case ActionTypes.SET_AVALIABLE_DECKS:
            return {
                ...state,
                avaliableDecks: payload
            };
        case ActionTypes.SET_AN_AVALIABLE_DECK:
            return {
                ...state,
                avaliableDecks: state.avaliableDecks.map((ad, i) => i === payload.index ? { ...ad, isAdded: payload.isAdded } : ad)
            };
        default:
            return state;
    }
}

export default folderReducer;