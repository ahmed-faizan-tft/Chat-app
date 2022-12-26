const Chat = require('../Model/chat.js');
const schema_validation = require('../utils/validation/chatValidation.js')


// on sending message mesage
 async function addMessage(req, res){
    try {

        // check validation of incoming data
        await schema_validation.validateAsync(req.body)

        const {_id, message, sender,receiver, time, isFile} = await Chat.create(req.body);

        return res.status(200).json({
            success: true,
            message: {_id, message, sender,receiver, time, isFile}
        });
        
        
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({
                success: false,
                message: error.details[0].message
            })
            return
        }
    }
 }



 // fetch all chats
 async function getChat(req,res){
    try {
        const chatData = await Chat.find({}).select({_id:1, message:1, sender:1, receiver: 1, time:1, isFile:1});
        return res.status(200).json({
            success: true,
            message: chatData
        })
    } catch (error) {
        console.log(error)
    }
 } 


 module.exports = {
    addMessage,
    getChat
 }