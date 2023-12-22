const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const server = http.createServer(app);
const io = socketIO(server);

let votes = Array(3).fill(0);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Enviar votos actuales al nuevo usuario
  socket.emit('updateVotes', votes);

  socket.on('vote', (index) => {
    if (index >= 0 && index < votes.length) {
      votes[index]++;
      io.emit('updateVotes', votes);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});