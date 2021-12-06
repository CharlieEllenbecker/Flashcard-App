const { Card, validate} = require('../models/card');
const { Deck } = require('../models/deck');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    PUT - Update the card with the given cardId from the deck with the given deckId
*/
router.put('/:deckId/:cardId', [auth, validateObjectIds], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let deck = await Deck.findById(req.params.deckId);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.deckId} does not exist.`);
    }

    const card = deck.cards.id(req.params.cardId);
    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.cardId} does not exist in the deck with the given id ${req.params.deckId}.`);
    }

    card.set(req.body);
    deck = await deck.save();
    
    return res.status(200).send(deck);
});

/*
    DELETE - Delete the card with the given cardId from the deck with the given deckId
*/
router.delete('/:deckId/:cardId', [auth, validateObjectIds], async (req, res) => {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.deckId} does not exist.`);
    }

    const card = deck.cards.id(req.params.cardId);
    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.cardId} does not exist in the deck with the given id ${req.params.deckId}.`);
    }

    card.remove();
    await deck.save();

    return res.status(200).send(card);
});

module.exports = router;