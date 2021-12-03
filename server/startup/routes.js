const express = require('express');
const error = require('../middleware/error');
const folders = require('../routes/folders');
const decks = require('../routes/decks');
const cards = require('../routes/cards');
const users = require('../routes/users');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/folders', folders);
    app.use('/api/decks', decks);
    app.use('/api/cards', cards);
    app.use('/api/users', users);
    app.use(error);
}