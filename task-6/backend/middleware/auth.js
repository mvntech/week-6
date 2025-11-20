const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const authHeader = req.header.authorization || '';
    if(!authHeader){
        req.user = null;
        return next();
    }

    const token = authHeader.split(' ')[1]; // bearer tokenString
    if(!token){
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        req.user = null;
        console.error(error.message)
    }
    return next();
}

module.exports = authMiddleware;