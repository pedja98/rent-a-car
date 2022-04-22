const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send("Invalid Token")
    }
    token = req.headers.authorization.split(' ')[1]
    if(token === null) {
        return res.status(401).send("Invalid Token")
    }
    let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.username = payload
    next();
}

module.exports = { tokenVerify }