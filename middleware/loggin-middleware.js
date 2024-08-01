const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const user=jwt.decode(token, {complete:true});
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.PALABRA_SECRETA, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports={authenticateToken};