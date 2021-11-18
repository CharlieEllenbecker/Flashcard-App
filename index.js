const folders = require('./routes/folders');
const decks = require('./routes/decks');
const cards = require('./routes/cards');

const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/folders', folders);
app.use('/api/decks', decks);
app.use('/api/cards', cards);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
});
