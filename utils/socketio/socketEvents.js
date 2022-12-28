function connection(io){
    io.on('connection', (socket)=>{
        // workers(socket);
        
        // socket.on('set_socket',(data)=>{
        //     socketInstance = socket;
        // })
        socket.on('send_message',(data)=>{
            socket.broadcast.emit('receive_message',data);
        })
    });
}





module.exports = {connection}