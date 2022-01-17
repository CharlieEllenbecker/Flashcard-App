import FolderActions from '../actions/types/folderTypeActions';

const initailState = {
    folders: [],
    selectedFolder: {
        decks: [],
    },
    avaliableDecks: []
};

const folderReducer = (state = initailState, { type, payload }) => {
    switch(type) {
        case FolderActions.SET_FOLDERS:
            return {
                ...state,
                folders: payload
            };
        case FolderActions.ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, payload]
            };
        case FolderActions.SET_SELECTED_FOLDER:
            return {
                ...state,
                selectedFolder: payload
            };
        case FolderActions.ADD_SELECTED_FOLDER_DECK:
            return {
                ...state,
                selectedFolder: {
                    ...state.selectedFolder,
                    decks: [...state.selectedFolder.decks, payload]
                }
            };
        case FolderActions.DELETE_SELECTED_FOLDER_DECK:
            return {
                ...state,
                selectedFolder: {
                    ...state.selectedFolder,
                    decks: [...state.selectedFolder.decks.slice(0, payload), ...state.selectedFolder.decks.slice(payload + 1)]
                }
            };
        case FolderActions.DELETE_SELECTED_FOLDER:
            return {
                ...state,
                folders: state.folders.filter(f => f._id !== state.selectedFolder._id),
                selectedFolder: {
                    decks: []
                }
            };
        case FolderActions.SET_AVALIABLE_DECKS:
            return {
                ...state,
                avaliableDecks: payload
            };
        case FolderActions.SET_AN_AVALIABLE_DECK:
            return {
                ...state,
                avaliableDecks: state.avaliableDecks.map((ad, i) => i === payload.index ? { ...ad, isAdded: payload.isAdded } : ad)
            };
        default:
            return state;
    }
}

export default folderReducer;