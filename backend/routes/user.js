const { Router } = require('express');
const authorizeUser = require('../controllers/authorizeUser');
const User = require('../models/user');
const userRouter = Router();
const { ObjectId } = require('mongodb');

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
    const drawing = user.data.filter(drawing => {

        console.log(drawing.id.toString() , id);
        
        return drawing.id.toString() === id;
    })[0];
    console.log(user.data);
    if (!drawing) {
        return res.status(404).send({
            message: "Drawing not found",
        });
    }
    res.send(drawing);
});

userRouter.post("/drawings", async (req, res) => {
    const { userId } = req;
    const { data } = req.body;
    if (!userId) {
        return res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }
    console.log(data, data, typeof data == "array");
    if (!(data || typeof data == "array")) {
        return res.status(400).send({
            message: "Invalid data",
        });
    }

    const id = new ObjectId();
    const updatedUser = await User.findByIdAndUpdate(userId, {
        $push: {
            data: {
                id,
                drawing: data,
            },
        },
    }, {
        new: true,
    });
    return res.send({
        message: "Drawing added successfully",
        data: {
            id,
            drawing: data,
        },
    });
});

userRouter.put("/drawings/:id", async (req, res) => {
    const { userId } = req;
    const { data } = req.body;
    const { id } = req.params;

    if (!userId) {
        return res.status(401).send({
            message: "You are Unauthorized to access this route",
        });
    }

    if (!data || !Array.isArray(data)) {
        return res.status(400).send({
            message: "Invalid data",
        });
    }

    const user = await User.findById(userId);

    let idx = -1;
    user.data.forEach((drawing, index) => {
        console.log(drawing.id.toString(), id, drawing.id.toString().localeCompare(id)==0);
        if (drawing.id.toString().localeCompare(id) == 0){
            idx = index;
        }
    });
    if (idx === -1) {
        return res.status(404).send({
            message: "Drawing not found",
        });
    }

    const userData = user.data.map((drawing, index) => {
        if (index === idx) {
            return { id, drawing: data };
        }
        return drawing;
    });

    const updatedUser = await User.findByIdAndUpdate(userId, {
        data: userData,
    }, {
        new: true,
    });

    return res.send({
        message: "Drawing updated successfully",
        data: updatedUser.data[idx],
        user:updatedUser
    });
});

module.exports = userRouter;