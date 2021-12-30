import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import ActionTypes from '../actions/actionTypes';

const initialState = {  // maybe it might be a good idea to make models for the front end? (convert to typescript)
    decks: [],
    newDeck: {
        cards: []
    },
    selectedDeck: {
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
        case ActionTypes.SET_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: payload
            };
        case ActionTypes.DELETE_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: [...state.selectedDeck.cards.slice(0, payload), ...state.selectedDeck.cards.slice(payload + 1)]
                }
            };
        case ActionTypes.EDIT_CARD_FROM_SELECTED_DECK:
            return {
                ...state,
                selectedDeck: {
                    ...state.selectedDeck,
                    cards: state.selectedDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front, back: payload.back } : c)
                }
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
        case ActionTypes.EDIT_NEW_DECK_CARD_FRONT:
            return {
                ...state,
                newDeck: { 
                    ...state.newDeck,
                    cards: state.newDeck.cards.map((c, i) => i === payload.index ? { ...c, front: payload.front } : c)
                }
            };
        case ActionTypes.EDIT_NEW_DECK_CARD_BACK:
            return {
                ...state,
                newDeck: { 
                    ...state.newDeck,
                    cards: state.newDeck.cards.map((c, i) => i === payload.index ? { ...c, back: payload.back } : c)
                }
        };
        case ActionTypes.DELETE_NEW_DECK_CARD:
            return {
                ...state,
                newDeck: {
                    ...state.newDeck,
                    cards: [...state.newDeck.cards.slice(0, payload), ...state.newDeck.cards.slice(payload + 1)]
                }
            };
        case ActionTypes.CLEAR_NEW_DECK:
            return {
                ...state,
                newDeck: {
                    cards: []
                }
            };
        default:
            return state;
    }
}

export default deckReducer;