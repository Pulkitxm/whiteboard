const { Router } = require("express");
const { signUpUser } = require("../controllers/authenticateUser");
const signupRouter = Router();
signupRouter.post("/", signUpUser);
module.exports = signupRouter;