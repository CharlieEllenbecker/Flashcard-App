const express = require('express');
const router = express.Router();
const Joi = require('joi');

const user = require('./mock-user.json');

let deckCount = 2;    // amount of decks in mock-user.json
const decks = user.data.decks;

/*
    GET - Get all decks
*/
router.get('/', (req, res) => {
    return res.send(decks);
});

/*
    POST - Add a new deck
*/
router.post('/', (req, res) => {
    const { error } = validateDeck(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const deck = {
        id: deckCount + 1,
        name: req.body.name
    };
    deckCount++;

    decks.push(deck);

    return res.send(deck);
});

/*
    GET - The deck with the given id
    This might include some deck data and the cards in the deck
*/
router.get('/:id', (req, res) => {
    const deck = decks.find(d => d.id === parseInt(req.params.id));

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

/*
    PUT - Update the deck with the given id
*/
router.put('/:id', (req, res) => {
    const deck = decks.find(d => d.id === parseInt(req.params.id));

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    const { error } = validateDeck(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    deck.name = req.body.name;

    return res.send(deck);
});

/*
    DELETE - Delete the deck with the given id
    This will delete the deck and its cards
*/
router.delete('/:id', (req, res) => {
    const deck = decks.find(d => d.id === parseInt(req.params.id));

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    const index = decks.indexOf(deck);
    decks.splice(index, 1);

    return res.send(deck);
});

function validateDeck(deck) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required()
    });

    return schema.validate(deck);
}

module.exports = router;