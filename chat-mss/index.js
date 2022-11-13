const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const usuariosConectados = []
const socketsConectados = []
const mensagens = []

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('on-line', (dados, resposta) => {

        usuariosConectados.push(dados);
        socketsConectados[dados.cpf] = socket;
        resposta('Usuario Logado!')
    })

    socket.emit('historico-mensagens', mensagens);

    socket.on('chat message', (msg) => {
        mensagens.push(msg)
        io.emit('chat message', msg);
    });

});

server.listen(2000, () => {
    console.log('listening on *:2000');
});