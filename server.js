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

/* Socket.io */
io.on('connection', (socket) => {

    let array = [];

    var intime = setInterval(() => {
        if (array.length <= 0)
            array = initDoc.generate();
        initDoc.refreshLoad(array);
        io.emit('loadPush', array);
    }, config.documents.refreshTime);

    socket.on('disconnect', () => {
        clearInterval(intime);
        socket.disconnect();
    });

});

/* Port d'écoute du server */
http.listen(config.server.port, () => {
    console.log('listening on *:' + config.server.port);
});