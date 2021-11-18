const mongoose = require('mongoose');
const Joi = require('joi');
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
    cards: [cardSchema],    // cards can't exist outside of a deck
    folder: {
        type: mongoose.Schema.Types.ObjectId,   // document referencing
        ref: 'Folder'
    }
}));

function validateDeck(deck) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(200)
    });

    return schema.validate(deck);
}

module.exports.Deck = Deck;
module.exports.validate = validateDeck;