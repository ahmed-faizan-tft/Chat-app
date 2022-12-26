const {create_user_schema_validation, login_schema_validation} = require('../utils/validation/userValidation')
const {password_schema_validation} = require('../utils/validation/passwordValidation.js')
const bcrypt = require('bcrypt');
const User = require('../Model/user.js');
var jwt = require('jsonwebtoken');
const Chat = require('../Model/chat.js');
const downloadFileQueue = require('../config/queue.js');
const workers = require('../utils/workers/worker.js')


async function createUser(req,res){
    try {
        let {username, email, password} = req.body;

        // validate user
        await create_user_schema_validation.validateAsync(req.body);

        // check existence of user
        let user = await User.findOne({email: email});

        if(user){
            let errorObj = new Error('You have signed up already')
            errorObj.name = 'UserExist';
            throw errorObj
        }
        


        // encrypt the password
        const encriptedPassword = await bcrypt.hash(password, 10);
        
         user = await User.create({
            username, 
            email, 
            password: encriptedPassword
        });


        return res.status(201).json({
            success: true,
            data: user
        })

    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({
                success: false,
                message: error.details[0].message
            })
            return
        }
        
        if(error.name === 'UserExist'){
            res.status(403).json({
                success: false,
                message: error.message
            })
            return
        }
    }
}

async function login(req,res){
    try {
        let {email, password} = req.body;

        // validate credential
        await login_schema_validation.validateAsync(req.body);
        
        // check existence of user
        let user = await User.findOne({email: email});

        if(!user){
            let errorObj = new Error('Please register yourself first before login')
            errorObj.name = 'UserNotExist';
            throw errorObj
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            let errorObj = new Error('Email and password wrong')
            errorObj.name = 'WrongCred';
            throw errorObj
        }

        // generate JWT token
        var token = jwt.sign({ value: user._id}, process.env.SECRET_KEY);

        return res.status(200).json({
            success: true,
            data: {
                access_token: token
            }
        })


    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({
                success: false,
                message: error.details[0].message
            })
            return
        }

        if(error.name === 'UserNotExist' || error.name === 'WrongCred'){
            res.status(404).json({
                success: false,
                message: error.message
            })
            return
        }
    }
}

async function getUser(req,res){
    try {
        return res.status(200).json({
            success: true,
            data: {
                username: req.user.username
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error in getUser"
        })
    }
}

async function resetPassword(req, res){
    try {
        const {id, password, confirmPassword} = req.body;
         
        await password_schema_validation.validateAsync(req.body);

        let user = await User.findById(id);

        if(user){
            // encrypt the password
            const encriptedPassword = await bcrypt.hash(password, 10);
            user.password = encriptedPassword;
            user.save();
        }else{
            let errorObj = new Error('You have to regster first')
            errorObj.name = 'NotRegistered';
            throw errorObj
        }

        return res.status(200).json({
            success: true,
            message: "Password has been reset"
        })
    } catch (error) {

        if(error.name === 'ValidationError'){
            res.status(400).json({
                success: false,
                message: error.details[0].message
            })
            return
        }

        if(error.name === 'NotRegistered'){
            res.status(400).json({
                success: false,
                message: error.message
            })
            return
        }

        return res.status(500).json({
            success:false,
            message: "Error in reset password"
        })
    }
}




async function uploadFile(req,res){
    try {
        console.log('req.body ',req.body)
        let user = await User.findById(req.user.id).select({password:0});

        if(!user){
            let errorObj = new Error('You are unauthorized user')
            errorObj.name = 'unauthorized';
            throw errorObj
        }
        if(req.file){
            user.files.push(`/uploadsFile/${req.file.filename}`);
            user.save();

            let chat = await Chat.create({
                message:`/uploadsFile/${req.file.filename}`,
                sender: req.body.sender,
                receiver: req.body.receiver,
                isFile: true
            })
            return res.status(200).json({
                success: true,
                data: chat,
                message: "Your file uploaded"
            })
        }

        return res.status(400).json({
            success: false,
            message: "Upload file"
        })
        
    } catch (error) {

        if(error.name === 'unauthorized'){
            res.status(401).json({
                success: false,
                message: error.message
            })
            return
        }

        return res.status(500).json({
            success:false,
            message: "Error upload file"
        })
    }
}

async function downloadFile(req,res){
    try {
        
        res.status(200).send('ok');

        // add jobs to queue
        const job = await downloadFileQueue.add({id: req.user.id});

        // handle each job
        // workers();
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    login,
    getUser,
    resetPassword,
    uploadFile,
    downloadFile
}