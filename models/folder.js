const mongoose = require('mongoose');
const Joi = require('joi');

const Folder = mongoose.model('Folder', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    description: {
        type: String,
        required: false,
        minLength: 5,
        maxLength: 200
    }
}));

function validateFolder(folder) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(200)
    });

    return schema.validate(folder);
}

module.exports.Folder = Folder;
module.exports.validate = validateFolder;