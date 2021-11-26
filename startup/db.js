const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/flashcard-app')
        .then(() => {
            console.log('Connected to MongoDB...');
            winston.info('Connected to MongoDB...');
        })
        .catch(() => console.error('Could not connect to MongoDB...'));
}