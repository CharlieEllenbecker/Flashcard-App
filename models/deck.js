const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);    // passing this function to the Joi class
const { cardSchema } = require('./card');

const Deck = mongoose.model('Deck', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    description: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 200
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,   // document referencing
        ref: 'Folder'
    },
    cards: [cardSchema] // cards can't exist outside of a deck
}));

function validateDeck(deck) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(200),
        folderId: Joi.objectId(),
        cards: Joi.array().items(Joi.object({
            front: Joi.string().min(1).max(200).required(),
            back: Joi.string().min(1).max(200).required()
        })).required()
    });

    return schema.validate(deck);
}

module.exports.Deck = Deck;
module.exports.validate = validateDeck;