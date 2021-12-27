import ActionTypes from './actionTypes';

export const setFolders = (folders) => {
    console.log('setting folders in store', folders);    
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