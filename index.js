const express = require('express');
const app = express();
const http = require('http').createServer(app);
const keys = require('./config/keys')
const PORT = process.env.PORT || 4006

const io = require('socket.io')(http);
io.use((socket, next) => {
    if(!socket.handshake.query.login || !socket.handshake.query.password)
        return next(new Error('authentication error'));
    const login = socket.handshake.query.login;
    const password = socket.handshake.query.password;
    if (login === keys.login && password === keys.password) {
        return next();
    } else
        return next(new Error('authentication error'));
});
require('./data/data').sockets(io)

http.listen(PORT, () => {
    console.log(`Server has been started on port:${PORT}`);
});