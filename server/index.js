const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors());
app.get('/hello', (_, res) => {
  res.send('hello');
  console.log('hello');
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`uesr Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log('server started');
});
