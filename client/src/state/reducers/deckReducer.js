import ActionTypes from '../actions/actionTypes';

const initialState = {
    decks: [],
    newDeck: {
        name: null,
        description: null,
        folderId: null,
        cards: []
    }
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
        case ActionTypes.SET_NEW_DECK_NAME:
            return {
                ...state,
                newDeck: { ...state.newDeck, name: payload }
            };
        case ActionTypes.SET_NEW_DECK_DESCRIPTION:
            return {
                ...state,
                newDeck: { ...state.newDeck, description: payload }
            };
        case ActionTypes.SET_NEW_DECK_FOLDER_ID:
            return {
                ...state,
                newDeck: { ...state.newDeck, folderId: payload }
            };
        case ActionTypes.SET_NEW_DECK_CARDS:
            return {
                ...state,
                newDeck: { ...state.newDeck, cards: payload }
            };
        default:
            return state;
    }
}

export default deckReducer;