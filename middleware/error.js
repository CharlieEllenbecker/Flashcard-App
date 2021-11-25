function handleError(err, req, res, next) {
    // Log the exception
    return res.status(500).send('Something failed.');
}

module.exports = handleError;