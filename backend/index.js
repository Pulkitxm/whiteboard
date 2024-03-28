const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authorizeIp = require('./middlewares/authorizeIp.js');
const signinRouter = require('./routes/signin.js');
const signupRouter = require('./routes/signup.js');

require("./config/db.js");
require("dotenv/config");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(authorizeIp);
app.use("/api/_vi/signin",signinRouter)
app.use("/api/_vi/signup",signupRouter)

io.on('connection', () => {
    console.log('a user connected');
});

const PORT=process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});