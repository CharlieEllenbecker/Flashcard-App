// state = initial state, action = particular action (contains the type and potential payload)
// a function that returns the state

const initailState = {
    folders: []
};

const foldersReducer = (state = initailState, action) => {
    switch(action.type) {
        case "setFolders":
            return {    // payload can only be a number, a string, or an object
                ...state,
                folders: action.payload.folders
            };
        case "addFolder":
            return {
                ...state,
                folders: [...state.folders, action.payload]
            };
        default:
            return state;
    }
}

export default foldersReducer;