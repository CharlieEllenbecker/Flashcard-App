const express = require('express');
const router = express.Router();
const Joi = require('joi');

const user = require('./mock-user.json');

let cardCount = 2;    // amount of cards in the Hiragana deck in mock-user.json
const cards = user.data.decks[0].cards;

/*
    GET - Get all cards
*/
router.get('/', (req, res) => {
    return res.send(cards);
});

/*
    POST - Add a new card
*/
router.post('/', (req, res) => {
    const { error } = validateCard(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const card = {
        id: cardCount + 1,
        front: req.body.front,
        back: req.body.back
    };
    cardCount++;

    card.push(card);

    return res.send(card);
});

/*
    GET - The card with the given id
*/
router.get('/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.id} does not exist`);
    }

    return res.send(card);
});

/*
    PUT - Update the card with the given id
*/
router.put('/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.id} does not exist`);
    }

    const { error } = validateCard(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    card.name = req.body.name;

    return res.send(card);
});

/*
    DELETE - Delete the card with the given id
*/
router.delete('/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).send(`The card with the given id ${req.params.id} does not exist`);
    }

    const index = cards.indexOf(card);
    cards.splice(index, 1);

    return res.send(card);
});

function validateCard(card) {
    const schema = Joi.object({
        front: Joi.string().min(1).max(100).required(),
        back: Joi.string().min(1).max(100).required()
    });

    return schema.validate(card);
}

module.exports = router;