const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { unHashPass } = require('../utils/password');

const authorizeUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const { username, password } = jwt.verify(token, process.env.JWT_SECRET);
        if (!username || !password) {
            res.status(401).send({
                message: "Invalid token",
            });
        }
        const user = await User.findOne({ username });

        const storedPass = unHashPass(jwt.verify(user.password, process.env.JWT_SECRET));
        if (password !== storedPass) {
            res.status(401).send({
                message: "Token Expired or Invalid",
            });
        }
        req.userId = user._id.toString();
        next()
    } catch (err) {
        res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }
}

module.exports = authorizeUser;