import ActionTypes from './actionTypes';

export const setDecks = (decks) => {
    return {
        type: ActionTypes.SET_DECKS,
        payload: decks
    };
}

export const addDeck = (deck) => {
    return {
        type: ActionTypes.ADD_DECK,
        payload: deck
    };
}

export const editUnsavedDeck = (unsavedDeck) => {
    return {
        type: ActionTypes.EDIT_UNSAVED_DECK,
        payload: unsavedDeck
    };
}