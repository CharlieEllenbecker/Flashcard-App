const folders = require('./routes/folders');
const decks = require('./routes/decks');
const cards = require('./routes/cards');
const users = require('./routes/users');
const handleError = require('./middleware/error');
const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

process.on('uncaughtException', (error) => {
    console.log('We got an uncaught exception.');
    winston.error(error.message, error);
});

const logger = winston.createLogger({   // look for a better way of handling this
    format: winston.format.combine(     // look into how to log to mongobd using transports
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});
winston.add(logger);

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/flashcard-app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/folders', folders);
app.use('/api/decks', decks);
app.use('/api/cards', cards);
app.use('/api/users', users);

app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
});
