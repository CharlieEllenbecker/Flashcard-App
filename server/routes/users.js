const { User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    Get - Get user info
*/
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).send(user);
});

/*
    POST - Add a new user
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        res.statusMessage = error.details[0].message;   // this is how to send messages to the front end actually
        return res.status(400).send();
    }

    let user = await User.findOne({ email: req.body.email });
    if(user) {
        return res.status(400).send('User already registered.');
    }

    user = new User(_.pick(req.body, ['email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();
    return res.status(200).header('authorization', token).send(_.pick(user, ['_id', 'email']));
});

module.exports = router;