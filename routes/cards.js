const { Card, validate} = require('../models/card');
const { Deck } = require('../models/deck');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

/*
    PUT - Update the card with the given cardId from the deck with the given deckId
    This would be used to update one card if needed to just update one card and not a whole deck
    TODO
*/
router.put('/:deckId/:cardId', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.deckId} does not exist`);
    }

    const card = deck.cards.id(req.params.cardId);
    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.cardId} does not exist in the deck with the given id ${req.params.deckId}`);
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
    Similar to quizlet where if you click the three dots on a card and on a deck...
    TODO
*/
router.delete('/:deckId/:cardId', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.id} does not exist`);
    }

    const index = cards.indexOf(card);
    cards.splice(index, 1);

    return res.send(card);
});

module.exports = router;