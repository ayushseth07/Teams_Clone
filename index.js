const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;
const path = require('path');

let socketList = {};

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    socket.disconnect();
  });

  socket.on('checkUser', ({ roomId, userName }) => {
    io.sockets.in(roomId).clients((err, clients) => {
      socket.emit('errorUserExists', {clients, userName, socketList});
    });
  });

  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    io.sockets.in(roomId).clients((err, clients) => {
        socket.broadcast.to(roomId).emit('userJoin', {clients, socketList});
    });
  });

  socket.on('callUser', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('receiveCall', { signal, from, info: socketList[socket.id] });
  });

  socket.on('acceptCall', ({ signal, to }) => {
    io.to(to).emit('callAccepted', { signal, answerId: socket.id });
  });

  socket.on('sendMessage', ({ roomID, msg, sender }) => {
    io.sockets.in(roomID).emit('receiveMessage', { msg, sender });
  });

  socket.on('leaveRoom', ({ roomId }) => {
    socket.broadcast.to(roomId).emit('userLeave', { userId: socket.id });
  });

  socket.on('finish',({roomId}) => {
    delete socketList[socket.id];
    io.sockets.sockets[socket.id].leave(roomId);
  })

  socket.on('toggle', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast.to(roomId).emit('toggleVideo', { userId: socket.id, switchTarget });
  });
});

server.listen(PORT, () => {
  console.log('Connected : '+ PORT);
});
