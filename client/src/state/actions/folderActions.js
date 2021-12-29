import ActionTypes from './actionTypes';

export const setFolders = (folders) => {
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

export const setSelectedFolderDecks = (decks) => {
    return {
        type: ActionTypes.SET_SELECTED_FOLDER_DECKS,
        payload: decks
    };
}