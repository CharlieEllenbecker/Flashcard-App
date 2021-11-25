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
        return res.status(400).send(error.details[0].message);
    }

    let deck = new Deck({
        name: req.body.name,
        description: req.body.description,
        folder: req.body.folder,
        cards: req.body.cards
    });
    deck = await deck.save();

    return res.send(deck);
});

/*
    GET - The deck with the given id
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
        folder: req.body.folder,
        cards: req.body.cards
    }, { new: true });

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

/*
    DELETE - Delete the deck with the given id
*/
router.delete('/:id', async (req, res) => {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist`);
    }

    return res.send(deck);
});

module.exports = router;