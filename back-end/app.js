require('dotenv').config();
const express = require('express');
const http = require('http');
// const router = require('./api/routes/index');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React app origin
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', function (data) {
        socket.join(data.email); // We are using room of socket io
        console.log("User has joined the room");
    });

    socket.on('chat', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat', msg); // Broadcast to everyone
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${5000}`);
});