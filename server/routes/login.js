const { User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    POST - Login user - Logout by not sending the token
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    const token = user.generateAuthToken();

    return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: false
                // maxAge: 1000000
                // signed: true
            })
            .send(_.pick(user, ['_id', 'email']));
});

module.exports = router;