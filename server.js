const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const votes = Array(3).fill(0); // Inicializar un array de votos con la longitud de tu conjunto de cards

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('vote', (index) => {
    // Incrementar el voto en la posición correspondiente del array
    if (index >= 0 && index < votes.length) {
      votes[index]++;
      // Emitir a todos los clientes para actualizar los votos
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