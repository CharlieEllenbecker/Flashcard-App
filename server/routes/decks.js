const { Deck, validate} = require('../models/deck');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all decks
*/
router.get('/', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const decks = await Deck.find({ userId: userId }).sort('name');
    return res.status(200).send(decks);
});

/*
    POST - Add a new deck
*/
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    let deck = new Deck(_.pick(req.body, ['name', 'description', 'folderId', 'cards', 'userId']));
    deck = await deck.save();

    return res.status(200).send(deck);
});

/*
    GET - The deck with the given id
*/
router.get('/:id', [auth, validateObjectIds], async (req, res) => {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.status(200).send(deck);
});

/*
    PUT - Update the deck with the given id
*/
router.put('/:id', [auth, validateObjectIds], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    const deck = await Deck.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'folderId', 'cards', 'userId']) , { new: true });
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.status(200).send(deck);
});

/*
    DELETE - Delete the deck with the given id
*/
router.delete('/:id', [auth, validateObjectIds], async (req, res) => {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
        return res.status(404).send(`The deck with the given id ${req.params.id} does not exist.`);
    }

    return res.status(200).send(deck);
});

module.exports = router;