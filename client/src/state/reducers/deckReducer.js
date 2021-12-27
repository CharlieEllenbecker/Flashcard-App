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
                decks: payload.decks
            };
        case ActionTypes.ADD_DECK:
            return {
                ...state,
                decks: [...state.decks, payload.deck]
            };
        case ActionTypes.EDIT_UNSAVED_DECK:
            return {
                ...state,
                unsavedDeck: {...state.unsavedDeck, ...payload.unsavedDeck} // TODO: CHECK IF THIS WORKS
            };
        default:
            return state;
    }
}

export default deckReducer;