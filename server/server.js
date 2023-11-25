const http = require("http");
const express = require("express");
const app = express();
const path = require('path');
const server = http.createServer(app);

app.set("port", "3000");

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


server.on("listening", () => {
    console.log("Usando puerto 3000");
});

server.listen("3000");

// Websockets
const io = require("socket.io")(server);
io.sockets.on("connection", (socket) =>{
    console.log("Cliente conectado: " + socket.id);
    socket.on("mouse", (data) => socket.broadcast.emit("mouse", data),);
    socket.on("disconnect", () => console.log("Cliente desconectado"));
    socket.on('clearCanvas', () => socket.broadcast.emit('clearCanvas'), console.log("Eliminando canvas"));
});