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

const userSchemaForSignin = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
});

const signInUser = async (req, res) => {

    try {
        const validateUser = userSchemaForSignin.parse(req.body);

        validateUser.username = validateUser.username.toLowerCase();

        const userExist = await User.findOne({ username: validateUser.username });
        if (!userExist) return res.status(400).send({
            message: "User does not exists",
        });

        try {
            let pass = jwt.verify(userExist.password, JWT_SECRET, {
                algorithm,
            });
            pass = unHashPass(pass);

            if(pass !== validateUser.password) return res.status(400).send({
                message: "Invalid password",
            });
            
            const token = jwt.sign({
                username: userExist.username,
                password: pass,
            }, JWT_SECRET);
            res.cookie('token', token, {
                maxAge: 60*60*60*24*7,// 1 week
                httpOnly: false,
            });
            res.send({
                username: userExist.username,
                email: userExist.email,
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
            message: "User does not exists",
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
        res.send({
            username: user.username,
            email: user.email,
            message: "User created successfully",
        });
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