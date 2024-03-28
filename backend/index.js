import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import "./config/db.js";
import "dotenv/config";
import authorizeIp from './middlewares/authorizeIp.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(authorizeIp);
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World',
    });
});

io.on('connection', () => {
    console.log('a user connected');
});

const PORT=process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});