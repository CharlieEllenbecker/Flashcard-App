import ActionTypes from './actionTypes';

export const setFolders = (folders) => {    // TODO: define parameters better...
    return {
        type: ActionTypes.SET_FOLDERS,
        payload: folders
    };
}

export const addFolder = (folder) => {
    return {
        type: ActionTypes.ADD_FOLDER,
        payload: folder
    };
}

export const setSelectedFolder = (folder) => {
    return {
        type: ActionTypes.SET_SELECTED_FOLDER,
        payload: folder
    };
}

export const addSelectedFolderDeck = (deck) => {
    return {
        type: ActionTypes.ADD_SELECTED_FOLDER_DECK,
        payload: deck
    };
}

export const deleteSelectedFolderDeck = (index) => {
    return {
        type: ActionTypes.DELETE_SELECTED_FOLDER_DECK,
        payload: index
    };
}

export const deleteSelectedFolder = () => {
    return {
        type: ActionTypes.DELETE_SELECTED_FOLDER,
        payload: null
    };
}

export const setAvaliableDecks = (decks) => {
    return {
        type: ActionTypes.SET_AVALIABLE_DECKS,
        payload: decks
    };
}

export const setAnAvaliableDeck = (deck) => {
    return {
        type: ActionTypes.SET_AN_AVALIABLE_DECK,
        payload: deck
    };
}