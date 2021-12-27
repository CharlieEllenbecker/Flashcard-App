import ActionTypes from './actionTypes';

export const setDecks = (decks) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_DECKS,
            payload: decks
        });
    }
}

export const addDeck = (deck) => {
    return (dispatch) => {
        dispatch({
            type: ADD_DECK,
            payload: deck
        });
    }
}

export const editUnsavedDeck = (unsavedDeck) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.EDIT_UNSAVED_DECK,
            payload: unsavedDeck
        });
    }
}