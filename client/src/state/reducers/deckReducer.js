import ActionTypes from '../actions/actionTypes';

const initialState = {  // maybe it might be a good idea to make models for the front end? (convert to typescript)
    decks: [],
    newDeck: {}
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
        case ActionTypes.ADD_NEW_DECK_CARD:
            return {
                ...state,
                newDeck: { 
                    ...state.newDeck,
                    cards: [...state.newDeck.cards, payload]
                }
            };
        case ActionTypes.EDIT_NEW_DECK_CARD_FRONT: {
            const cards = state.newDeck.cards;
            const card = cards.find(c => c.tempId === payload.tempId);
            card.front = payload.front;

            return {
                ...state,
                newDeck: { 
                    ...state.newDeck,
                    cards: cards
                }
            };
        }
        case ActionTypes.EDIT_NEW_DECK_CARD_BACK: {
            const cards = state.newDeck.cards;
            const card = cards.find(c => c.tempId === payload.tempId);
            card.back = payload.back;

            return {
                ...state,
                newDeck: { 
                    ...state.newDeck,
                    cards: cards
                }
            };
        }
        default:
            return state;
    }
}

export default deckReducer;