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

export const setSelectedDeck = (deck) => {
    return {
        type: ActionTypes.SET_SELECTED_DECK,
        payload: deck
    };
}

export const setCurrentCardIndex = (index) => {
    return {
        type: ActionTypes.SET_CURRENT_CARD_INDEX,
        payload: index
    };
}

export const deleteCardFromSelectedDeck = (index) => {
    return {
        type: ActionTypes.DELETE_CARD_FROM_SELECTED_DECK,
        payload: index
    };
}

export const setCardFromSelectedDeck = (card) => {
    return {
        type: ActionTypes.SET_CARD_FROM_SELECTED_DECK,
        payload: card
    };
}

export const setEditDeck = (deck) => {
    return {
        type: ActionTypes.SET_EDIT_DECK,
        payload: deck
    };
}

export const setEditDeckName = (name) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_NAME,
        payload: name
    };
}

export const setEditDeckDescription = (description) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_DESCRIPTION,
        payload: description
    };
}

export const setEditDeckFolderId = (folderId) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_FOLDER_ID,
        payload: folderId
    };
}

export const setEditDeckCards = (cards) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_CARDS,
        payload: cards
    };
}

export const addEditDeckCard = (card) => {
    return {
        type: ActionTypes.ADD_EDIT_DECK_CARD,
        payload: card
    };
}

export const setEditDeckCardFront = (card) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_CARD_FRONT,
        payload: card
    };
}

export const setEditDeckCardBack = (card) => {
    return {
        type: ActionTypes.SET_EDIT_DECK_CARD_BACK,
        payload: card
    };
}

export const deleteEditDeckCard = (index) => {
    return {
        type: ActionTypes.DELETE_EDIT_DECK_CARD,
        payload: index
    };
}

export const clearEditDeck = () => {
    return {
        type: ActionTypes.CLEAR_EDIT_DECK,
        payload: null
    };
}