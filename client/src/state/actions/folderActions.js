import ActionTypes from './actionTypes';

export const setFolders = (folders) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_FOLDER,
            payload: folders
        });
    }
}

export const addFolder = (folder) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.ADD_FOLDER,
            payload: folder
        });
    }
}