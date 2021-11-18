const mongoose = require('mongoose');
const Joi = require('joi');

/*
    Still learning how to implement one to many relationships in mongodb using mongoose

    Business Rules:
    - Allow the user to add decks to a folder or not have decks in a folder
*/
const Folder = mongoose.model('Folder', new mongooseSchema({
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
    }
}));

function validateFolder(folder) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(200)
    });

    return schema.validate(folder);
}

module.exports.Folder = Folder;
module.exports.validate = validateFolder;