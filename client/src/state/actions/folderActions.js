import FolderActions from './types/FolderActions';

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

export const setAnAvaliableDeck = (deck) => {
    return {
        type: FolderActions.SET_AN_AVALIABLE_DECK,
        payload: deck
    };
}