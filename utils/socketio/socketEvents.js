function connection(io){
    io.on('connection', (socket)=>{
        

        socket.on('send_message',(data)=>{
            socket.broadcast.emit('receive_message',data);
        })
    });


}







module.exports = {connection}