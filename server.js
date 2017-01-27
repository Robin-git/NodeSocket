"use strict";

/* Variable de l'application */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/* Déclaration du dossier courrant */
app.use(express.static(__dirname));

/* Router */
app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

/* Module */
const initDoc = require('./src/ajax.js');
const config = require('./server.config.js').config;

let array = initDoc.generate();

var intime = setInterval(() => {
    if (initDoc.reloadDocs(array)) {
        array = initDoc.generate();
    }
    initDoc.refreshLoad(array);
    io.emit('loadPush', array);
}, config.documents.refreshTime);

/* Socket.io */
io.on('connection', (socket) => {
    console.log('A new user connect !');
    socket.on('disconnect', () => {
        socket.disconnect();
    });
});

/* Port d'écoute du server */
http.listen(config.server.port, () => {
    console.log('listening on *:' + config.server.port);
});