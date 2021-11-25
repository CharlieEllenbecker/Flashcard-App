const { Card, validate} = require('../models/card');
const { Deck } = require('../models/deck');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    PUT - Update the card with the given cardId from the deck with the given deckId
*/
router.put('/:deckId/:cardId', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.deckId} does not exist.`);
    }

    const card = deck.cards.id(req.params.cardId);
    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.cardId} does not exist in the deck with the given id ${req.params.deckId}.`);
    }

    card.set(req.body);

    return await deck.save()    // Not sure if this promise handling is correct
        .then(deck => {
            res.send(deck);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

/*
    DELETE - Delete the card with the given cardId from the deck with the given deckId
*/
router.delete('/:deckId/:cardId', async (req, res) => {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.deckId} does not exist.`);
    }

    const card = deck.cards.id(req.params.cardId);
    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.cardId} does not exist in the deck with the given id ${req.params.deckId}.`);
    }

    card.remove();
    deck.save();

    return res.send(card);
});

module.exports = router;