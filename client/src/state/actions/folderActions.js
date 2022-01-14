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

export const deleteSelectedFolder = () => {
    return {
        type: ActionTypes.DELETE_SELECTED_FOLDER,
        payload: null
    };
}