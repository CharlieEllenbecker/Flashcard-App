const folders = require('./routes/folders');
const decks = require('./routes/decks');
const cards = require('./routes/cards');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/flashcard-app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/folders', folders);
app.use('/api/decks', decks);
app.use('/api/cards', cards);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
});
