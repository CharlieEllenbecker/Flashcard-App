import ActionTypes from '../actions/actionTypes';

const initialState = {
    decks: [],
    unsavedDeck: {}
};

const deckReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.SET_DECKS:
            return {
                ...state,
                decks: payload
            };
        case ActionTypes.ADD_DECK:
            return {
                ...state,
                decks: [...state.decks, payload]
            };
        case ActionTypes.EDIT_UNSAVED_DECK:
            return {
                ...state,
                unsavedDeck: {...state.unsavedDeck, ...payload} // TODO: CHECK IF THIS WORKS
            };
        default:
            return state;
    }
}

export default deckReducer;