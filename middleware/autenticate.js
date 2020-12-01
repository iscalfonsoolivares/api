var expressJWT = require('express-jwt');

const keys = require('../config/keys');

const authenticate = expressJWT({
    secret: keys.jwtKey,
    algorithms: ['HS256'],
    getToken: function fromHeaderOrCookie(req) {
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if(req.cookies && req.cookies.token) {
            return req.cookies.token;
        }
        return null;
    }
});

module.exports = authenticate;