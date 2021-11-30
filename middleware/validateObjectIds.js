const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if('id' in req.params && !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('Invalid ID.');
    }
    else if('deckId' in req.params && 'cardId' in req.params && (!mongoose.Types.ObjectId.isValid(req.params.deckId) || !mongoose.Types.ObjectId.isValid(req.params.cardId))) {
        return res.status(404).send('Invalid DeckID or CardID.');
    }

    next();
}