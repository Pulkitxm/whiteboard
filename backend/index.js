const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authorizeIp = require('./middlewares/authorizeIp.js');
const signinRouter = require('./routes/signin.js');
const signupRouter = require('./routes/signup.js');
const userRouter = require('./routes/user.js');
const cookieParser = require('cookie-parser')
const cors = require('cors');

require("./config/db.js");
require("dotenv/config");

const app = express();
const server = createServer(app);
const io = new Server(server);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(authorizeIp);
app.use("/api/_vi/signin", signinRouter)
app.use("/api/_vi/signup", signupRouter)
app.use("/api/_vi/me", userRouter)

io.on('connection', () => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});