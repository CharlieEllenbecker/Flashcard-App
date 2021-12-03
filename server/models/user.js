const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }                       // ad property 'isAdmin' if privileges should be added
});                         // then add middleware funciton with off chance for 403 status returned

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()      // utilize joi-password-conplexity module
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;