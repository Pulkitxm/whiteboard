const { Router } = require('express');
const authorizeUser = require('../controllers/authorizeUser');
const User = require('../models/user');
const userRouter = Router();

userRouter.use(authorizeUser);

userRouter.get("/", async (req, res) => {
    const { userId } = req;
    if (!userId) {
        res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }
    const user = await User.findById(userId);
    res.send({
        username: user.username,
        email: user.email,
    });
});

userRouter.get("/drawings", async (req, res) => {
    const { userId } = req;
    if (!userId) {
        res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }
    const user = await User.findById(userId);
    res.send(user.data);
});

userRouter.get("/drawings/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    if (!userId) {
        res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }
    const user = await User.findById(userId);
    const drawing = user.data.filter(drawing => drawing._id.toString() === id)
    res.send(drawing);
});

module.exports = userRouter;