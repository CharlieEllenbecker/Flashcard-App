const winston = require('winston');

function handleError(err, req, res, next) {
    winston.error(err.message, err);

    return res.status(500).send('Something failed.');
}

module.exports = handleError;