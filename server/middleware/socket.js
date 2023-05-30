const socket = require('socket.io')

const socketsetup = (server) => {
    let io = socket(server)
    io.on('connection', (socket) => {
        socket.on('join room', ({ room1, room2 }) => {
            socket.join(room1)
            socket.join(room2)
        })
        socket.on("private message", (message) => {
            io.to(message.room).emit('new Message', {
                message: message.message,
                sender: message.sender
            });
        })
        socket.on('end connection', () => {
            console.log('Socket disconnected');
        })
    })
}

module.exports = socketsetup