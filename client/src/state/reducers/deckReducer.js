import DeckActions from '../actions/types/deckTypeActions';

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
        case DeckActions.SET_DECKS:
            return {
                ...state,
                decks: payload
            };
        case DeckActions.ADD_DECK:
            return {
                ...state,
                decks: [...state.decks, payload]
            };
        case DeckActions.SET_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: payload
            };
        case DeckActions.DELETE_SELECTED_DECK:
            return {
                ...state,
                decks: state.decks.filter(d => d._id !== state.selectedDeck._id),
                selectedDeck: {
                    cards: []
                }
            };
        case DeckActions.SET_CURRENT_CARD_INDEX:
            return {
                ...state,
                currentCardIndex: payload
            };
        case DeckActions.DELETE_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: [...state.selectedDeck.cards.slice(0, payload), ...state.selectedDeck.cards.slice(payload + 1)]
                }
            };
        case DeckActions.SET_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: state.selectedDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front, back: payload.back } : c)
                }
            };
        case DeckActions.SET_EDIT_DECK:
            return {
                ...state,
                editDeck: payload
            };
        case DeckActions.SET_EDIT_DECK_NAME:
            return {
                ...state,
                editDeck: { ...state.editDeck, name: payload }
            };
        case DeckActions.SET_EDIT_DECK_DESCRIPTION:
            return {
                ...state,
                editDeck: { ...state.editDeck, description: payload }
            };
        case DeckActions.SET_EDIT_DECK_FOLDER_ID:
            return {
                ...state,
                editDeck: { ...state.editDeck, folderId: payload }
            };
        case DeckActions.SET_EDIT_DECK_CARDS:
            return {
                ...state,
                editDeck: { ...state.editDeck, cards: payload }
            };
        case DeckActions.ADD_EDIT_DECK_CARD:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: [...state.editDeck.cards, payload]
                }
            };
        case DeckActions.SET_EDIT_DECK_CARD_FRONT:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: state.editDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front } : c)
                }
            };
        case DeckActions.SET_EDIT_DECK_CARD_BACK:
            return {
                ...state,
                editDeck: { 
                    ...state.editDeck,
                    cards: state.editDeck.cards.map((c, i) => i === payload.index ? { ...c, back: payload.back } : c)
                }
        };
        case DeckActions.DELETE_EDIT_DECK_CARD:
            return {
                ...state,
                editDeck: {
                    ...state.editDeck,
                    cards: [...state.editDeck.cards.slice(0, payload), ...state.editDeck.cards.slice(payload + 1)]
                }
            };
        case DeckActions.CLEAR_EDIT_DECK:
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