const User = require("../models/user");
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const { hashPass, unHashPass } = require('../utils/password');
require("dotenv/config");

const algorithm = process.env.JWT_ALGO || 'HS256';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN) || "3d";

const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(3).max(20),
});

const signInUser = async (req, res) => {

    try {
        const validateUser = userSchema.parse(req.body);

        validateUser.username = validateUser.username.toLowerCase();
        validateUser.email = validateUser.email.toLowerCase();

        const userExist = await User.findOne({ username: validateUser.username });
        if (!userExist) return res.status(400).send({
            message: "User does not exists",
        });

        try {
            let pass = jwt.verify(userExist.password, JWT_SECRET, {
                algorithm,
            });
            pass = unHashPass(pass);
            const token = jwt.sign({
                password: pass,
            }, JWT_SECRET, { expiresIn: EXPIRES_IN });

            res.send({
                username: userExist.username,
                email: userExist.email,
                token
            });
        } catch (err) {
            res.send({
                message: "Error while Signing in",
            });
        }
    } catch (err) {
        res.send({
            message: "Invalid input",
        });
    }
};
const signUpUser = async (req, res) => {
    try {
        const validateUser = userSchema.parse(req.body);

        validateUser.username = validateUser.username.toLowerCase();
        validateUser.email = validateUser.email.toLowerCase();

        const userExist = await User.findOne({ username: validateUser.username });
        if (userExist) return res.status(400).send({
            message: "User already exists",
        });

        const hashedPass = hashPass(validateUser.password);
        const encryptedPass = jwt.sign(hashedPass, JWT_SECRET, {
            algorithm,
        });

        const user = new User({
            username: validateUser.username,
            email: validateUser.email,
            password: encryptedPass,
        });
        await user.save();
        res.send(user);
    } catch (err) {
        res.send({
            message: "Invalid input",
        });
    }
};

module.exports = {
    signInUser,
    signUpUser,
}