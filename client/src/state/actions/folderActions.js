import FolderActions from './types/folderTypeActions';

export const setFolders = (folders) => {    // TODO: define parameters better...
    return {
        type: FolderActions.SET_FOLDERS,
        payload: folders
    };
}

export const addFolder = (folder) => {
    return {
        type: FolderActions.ADD_FOLDER,
        payload: folder
    };
}

export const setSelectedFolder = (folder) => {
    return {
        type: FolderActions.SET_SELECTED_FOLDER,
        payload: folder
    };
}

export const addSelectedFolderDeck = (deck) => {
    return {
        type: FolderActions.ADD_SELECTED_FOLDER_DECK,
        payload: deck
    };
}

export const deleteSelectedFolderDeck = (index) => {
    return {
        type: FolderActions.DELETE_SELECTED_FOLDER_DECK,
        payload: index
    };
}

export const deleteSelectedFolder = () => {
    return {
        type: FolderActions.DELETE_SELECTED_FOLDER,
        payload: null
    };
}

export const setAvaliableDecks = (decks) => {
    return {
        type: FolderActions.SET_AVALIABLE_DECKS,
        payload: decks
    };
}

export const setAvaliableDeck = (deck) => {
    return {
        type: FolderActions.SET_AVALIABLE_DECK,
        payload: deck
    };
}

export const deleteAvaliableDeck = (deckId) => {
    return {
        type: FolderActions.DELETE_AVALIABLE_DECK,
        payload: deckId
    };
}