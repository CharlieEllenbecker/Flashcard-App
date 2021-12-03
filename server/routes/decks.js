const { Deck, validate} = require('../models/deck');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
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
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let deck = new Deck(_.pick(req.body, ['name', 'description', 'folderId', 'cards']));
    deck = await deck.save();

    return res.send(deck);
});

/*
    GET - The deck with the given id
*/
router.get('/:id', validateObjectIds, async (req, res) => {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.send(deck);
});

/*
    PUT - Update the deck with the given id
*/
router.put('/:id', [auth, validateObjectIds], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const deck = await Deck.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'folderId', 'cards']), { new: true });

    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.send(deck);
});

/*
    DELETE - Delete the deck with the given id
*/
router.delete('/:id', [auth, validateObjectIds], async (req, res) => {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.send(deck);
});

module.exports = router;