const jwt = require('jsonwebtoken');
const CONFIG = require('../Constants/config')

module.exports = (req, res, next) => {
    try {
        // const AuthorizationHeader = req.headers['Authorization'] || req.headers['authorization'] || "";
        // const token = AuthorizationHeader.split(" ")[1]
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token);
        const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
        req.userData = decoded
        next()
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {

            return res.status(401).send({ status: false, auth: false, error: { error:'Authenticate token Expired'} });
        }
        else {
            return res.status(401).send({ status: false, auth: false, error: {error:' Invalid token.'} });
        }
        // return res.status(401).json({
        //     message: 'Auth failed'
        // })
    }

}