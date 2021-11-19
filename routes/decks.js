const { Deck, validate} = require('../models/deck');
const express = require('express');
const router = express.Router();

/*
    GET - Get all decks
*/
router.get('/', async (req, res) => {
    const decks = await Deck.find().sort('name');
    return res.send(decks);
});

/*
    POST - Add a new deck
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);  // might want to concatinate all of the errors in the details array
    }

    let deck = new Deck({
        name: req.body.name,
        description: req.body.description,
        cards: req.body.cards,
        folder: req.body.folder
    });
    deck = await deck.save();

    return res.send(deck);
});

/*
    GET - The deck with the given id
    This might include some deck data and the cards in the deck
*/
router.get('/:id', async (req, res) => {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

/*
    PUT - Update the deck with the given id
*/
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const deck = await Deck.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        cards: req.body.cards,
        folder: req.body.folder
    }, { new: true });

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

/*
    DELETE - Delete the deck with the given id
    This will delete the deck and its cards
*/
router.delete('/:id', async (req, res) => {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

module.exports = router;