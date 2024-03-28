const { Router } = require("express");
const { signInUser } = require("../controllers/authenticateUser");
const signinRouter = Router();
signinRouter.post("/", signInUser);
module.exports = signinRouter;