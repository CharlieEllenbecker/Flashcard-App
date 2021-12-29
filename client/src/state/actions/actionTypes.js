const ActionTypes = {
    SET_FOLDERS: 'setFolders',
    ADD_FOLDER: 'addFolder',
    SET_SELECTED_FOLDER_DECKS: 'setSelectedFolderDecks',
    SET_DECKS: 'setDecks',
    ADD_DECK: 'addDeck',
    SET_SELECTED_DECK: 'setSelectedDeck',
    SET_NEW_DECK_NAME: 'setNewDeckName',
    SET_NEW_DECK_DESCRIPTION: 'setNewDeckDescription',
    SET_NEW_DECK_FOLDER_ID: 'setNewDeckFolderId',
    SET_NEW_DECK_CARDS: 'setNewDeckCards',  // probably not needed unless if utilize newDeck as an edit page
    ADD_NEW_DECK_CARD: 'addNewDeckCard',
    EDIT_NEW_DECK_CARD_FRONT: 'editNewDeckCardFront',
    EDIT_NEW_DECK_CARD_BACK: 'editNewDeckCardBack',
    DELETE_NEW_DECK_CARD: 'deleteNewDeckCard',
    CLEAR_NEW_DECK: 'clearNewDeck'
};

export default ActionTypes;