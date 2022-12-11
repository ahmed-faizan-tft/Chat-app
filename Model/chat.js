const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    message:{
        type: String,
        require: true,
        trim:true
    },

    sender: {
        type: String,
        require: true,
        trim:true
    },

    receiver: {
        type: String,
        require: true,
        trim:true
    },
    time: {
        type: String,
        default: new Date().toLocaleString('en-us',{hour:'numeric',minute:'numeric', hour12:true}),
    }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;