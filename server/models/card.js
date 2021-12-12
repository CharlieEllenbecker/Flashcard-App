const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    },
    back: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    }
}, { versionKey: false });

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        front: Joi.string().min(1).max(200).required(),
        back: Joi.string().min(1).max(200).required()
    });

    return schema.validate(card);
}

module.exports.cardSchema = cardSchema;
module.exports.Card = Card;
module.exports.validate = validateCard;