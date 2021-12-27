import ActionTypes from '../actions/actionTypes';

const initailState = {
    folders: []
};

const folderReducer = (state = initailState, { type, payload }) => {
    switch(type) {
        case ActionTypes.SET_FOLDER:
            return {
                ...state,
                folders: payload.folders
            };
        case ActionTypes.ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, payload]
            };
        default:
            return state;
    }
}

export default folderReducer;