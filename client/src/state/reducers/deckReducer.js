import ActionTypes from '../actions/actionTypes';

const initialState = {
    decks: [],
    editDeck: {
        cards: []
    },
    selectedDeck: {
        cards: []
    },
    currentCardIndex: 0
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
        case ActionTypes.SET_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: payload
            };
        case ActionTypes.SET_CURRENT_CARD_INDEX:
            return {
                ...state,
                currentCardIndex: payload
            };
        case ActionTypes.DELETE_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: [...state.selectedDeck.cards.slice(0, payload), ...state.selectedDeck.cards.slice(payload + 1)]
                }
            };
        case ActionTypes.SET_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: state.selectedDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front, back: payload.back } : c)
                }
            };
        case ActionTypes.SET_EDIT_DECK:
            return {
                ...state,
                editDeck: payload
            };
        case ActionTypes.SET_EDIT_DECK_NAME:
            return {
                ...state,
                editDeck: { ...state.editDeck, name: payload }
            };
        case ActionTypes.SET_EDIT_DECK_DESCRIPTION:
            return {
                ...state,
                editDeck: { ...state.editDeck, description: payload }
            };
        case ActionTypes.SET_EDIT_DECK_FOLDER_ID:
            return {
                ...state,
                editDeck: { ...state.editDeck, folderId: payload }
            };
        case ActionTypes.SET_EDIT_DECK_CARDS:
            return {
                ...state,
                editDeck: { ...state.editDeck, cards: payload }
            };
        case ActionTypes.ADD_EDIT_DECK_CARD:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: [...state.editDeck.cards, payload]
                }
            };
        case ActionTypes.SET_EDIT_DECK_CARD_FRONT:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: state.editDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front } : c)
                }
            };
        case ActionTypes.SET_EDIT_DECK_CARD_BACK:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: state.editDeck.cards.map((c, i) => i === payload.index ? { ...c, back: payload.back } : c)
                }
        };
        case ActionTypes.DELETE_EDIT_DECK_CARD:
            return {
                ...state,
                editDeck: {
                    ...state.editDeck,
                    cards: [...state.editDeck.cards.slice(0, payload), ...state.editDeck.cards.slice(payload + 1)]
                }
            };
        case ActionTypes.CLEAR_EDIT_DECK:
            return {
                ...state,
                editDeck: {
                    cards: []
                }
            };
        default:
            return state;
    }
}

export default deckReducer;