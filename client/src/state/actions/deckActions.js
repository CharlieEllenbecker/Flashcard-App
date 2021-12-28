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

export const setNewDeckName = (name) => {
    return {
        type: ActionTypes.SET_NEW_DECK_NAME,
        payload: name
    };
}

export const setNewDeckDescription = (description) => {
    return {
        type: ActionTypes.SET_NEW_DECK_DESCRIPTION,
        payload: description
    };
}

export const setNewDeckFolderId = (folderId) => {
    return {
        type: ActionTypes.SET_NEW_DECK_FOLDER_ID,
        payload: folderId
    };
}

export const setNewDeckCards = (cards) => {
    return {
        type: ActionTypes.SET_NEW_DECK_CARDS,
        payload: cards
    };
}

export const addNewDeckCard = (card) => {
    return {
        type: ActionTypes.ADD_NEW_DECK_CARD,
        payload: card
    };
}

export const editNewDeckCardFront = (card) => {
    return {
        type: ActionTypes.EDIT_NEW_DECK_CARD_FRONT,
        payload: card
    };
}

export const editNewDeckCardBack = (card) => {
    return {
        type: ActionTypes.EDIT_NEW_DECK_CARD_BACK,
        payload: card
    };
}

export const clearNewDeck = () => {
    return {
        type: ActionTypes.CLEAR_NEW_DECK,
        payload: null
    };
}