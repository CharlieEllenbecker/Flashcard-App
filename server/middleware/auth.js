const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        res.statusMessage = 'Access denied. No token provided.';
        return res.status(401);
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(error) {
        res.statusMessage = 'Invalid token.';
        return res.status(400);
    }
}