const express = require('express');
const router = express.Router();
const Joi = require('joi');

/*
    PUT - Update the card with the given cardId from the deck with the given deckId
    This would be used to update one card if needed to just update one card and not a whole deck
    TODO
*/
router.put('/:deckId/:cardId', (req, res) => {
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
    DELETE - Delete the card with the given cardId from the deck with the given deckId
    Similar to quizlet where if you click the three dots on a card and on a deck...
    TODO
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