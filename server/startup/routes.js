const express = require('express');
const cookieParser = require('cookie-parser');
const error = require('../middleware/error');
const folders = require('../routes/folders');
const decks = require('../routes/decks');
const cards = require('../routes/cards');
const users = require('../routes/users');
const login = require('../routes/login');

module.exports = function(app) {
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/folders', folders);
    app.use('/api/decks', decks);
    app.use('/api/cards', cards);
    app.use('/api/users', users);
    app.use('/api/login', login);
    app.use(error);
}