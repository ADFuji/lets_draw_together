const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
socket = io.Server
io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('try_to_connect', (data) => {
        console.log(data)
        io.to(socket.id).emit('connected', socket.id)
    })
    
});
server.listen(3000, () => {
    console.log('listening on *:3000')
});