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

export const setSelectedFolder = (folder) => {
    return {
        type: ActionTypes.SET_SELECTED_FOLDER,
        payload: folder
    };
}
//
// export const setSelectedFolderName = (name) => {
//     return {
//         type: ActionTypes.SET_SELECTED_FOLDER_NAME,
//         payload: name
//     };
// }

// export const setSelectedFolderDescription = (description) => {
//     return {
//         type: ActionTypes.SET_SELECTED_FOLDER_DESCRIPTION,
//         payload: description
//     };
// }

// export const setSelectedFolderDecks = (decks) => {
//     return {
//         type: ActionTypes.SET_SELECTED_FOLDER_DECKS,
//         payload: decks
//     };
// }