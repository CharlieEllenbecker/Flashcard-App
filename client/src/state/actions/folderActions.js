export const addFolder = (folder) => {
    return (dispatch) => {
        dispatch({
            type: 'addFolder',
            payload: folder
        });
    }
}

export const setFolders = (folders) => {    // prefer to not make this async and handle the api call here... however middleware is nice...
    return (dispatch) => {
        dispatch({
            type: 'setFolders',
            payload: folders    // is an array going to work here?
        });
    }
}