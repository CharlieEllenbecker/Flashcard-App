import DeckActions from './types/deckTypeActions';

export const setDecks = (decks) => {    // TODO: define parameters better...
    return {
        type: DeckActions.SET_DECKS,
        payload: decks
    };
}

export const addDeck = (deck) => {
    return {
        type: DeckActions.ADD_DECK,
        payload: deck
    };
}

export const setSelectedDeck = (deck) => {
    return {
        type: DeckActions.SET_SELECTED_DECK,
        payload: deck
    };
}

export const deleteSelectedDeck = () => {
    return {
        type: DeckActions.DELETE_SELECTED_DECK,
        payload: null
    };
}

export const setCurrentCardIndex = (index) => {
    return {
        type: DeckActions.SET_CURRENT_CARD_INDEX,
        payload: index
    };
}

export const deleteCardFromSelectedDeck = (index) => {
    return {
        type: DeckActions.DELETE_CARD_FROM_SELECTED_DECK,
        payload: index
    };
}

export const setCardFromSelectedDeck = (card) => {
    return {
        type: DeckActions.SET_CARD_FROM_SELECTED_DECK,
        payload: card
    };
}

export const setEditDeck = (deck) => {
    return {
        type: DeckActions.SET_EDIT_DECK,
        payload: deck
    };
}

export const setEditDeckName = (name) => {
    return {
        type: DeckActions.SET_EDIT_DECK_NAME,
        payload: name
    };
}

export const setEditDeckDescription = (description) => {
    return {
        type: DeckActions.SET_EDIT_DECK_DESCRIPTION,
        payload: description
    };
}

export const setEditDeckFolderId = (folderId) => {
    return {
        type: DeckActions.SET_EDIT_DECK_FOLDER_ID,
        payload: folderId
    };
}

export const setEditDeckCards = (cards) => {
    return {
        type: DeckActions.SET_EDIT_DECK_CARDS,
        payload: cards
    };
}

export const addEditDeckCard = (card) => {
    return {
        type: DeckActions.ADD_EDIT_DECK_CARD,
        payload: card
    };
}

export const setEditDeckCardFront = (card) => {
    return {
        type: DeckActions.SET_EDIT_DECK_CARD_FRONT,
        payload: card
    };
}

export const setEditDeckCardBack = (card) => {
    return {
        type: DeckActions.SET_EDIT_DECK_CARD_BACK,
        payload: card
    };
}

export const deleteEditDeckCard = (index) => {
    return {
        type: DeckActions.DELETE_EDIT_DECK_CARD,
        payload: index
    };
}

export const clearEditDeck = () => {
    return {
        type: DeckActions.CLEAR_EDIT_DECK,
        payload: null
    };
}