const workers = require('../workers/worker')

function connection(io){
    io.on('connection', (socket)=>{
        // workers(socket);
        socketInstance = socket;
        socket.on('send_message',(data)=>{
            console.log(socket.id);
            socket.broadcast.emit('receive_message',data);
        })
    });


}







module.exports = {connection}