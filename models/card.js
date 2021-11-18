const mongoose = require('mongoose');
const Joi = require('joi');

const Card = mongoose.model('Card', new mongooseSchema({
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
}));

function validateCard(card) {
    const schema = Joi.object({
        front: Joi.string().min(1).max(200).required(),
        back: Joi.string().min(1).max(200).required()
    });

    return schema.validate(card);
}

module.exports.Card = Card;
module.exports.validate = validateCard;