const dotenv = require('dotenv-safe');
const jwt = require('jsonwebtoken');

dotenv.config();

const auth = async(req, res, next) => {
    let token = req.header('Authorization');    
    
    if (token) token = token.replace('Bearer ', '');

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = auth;
