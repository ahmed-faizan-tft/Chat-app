const express = require('express');
const router = express.Router();
const {addMessage, getChat} = require('../Controller/chat.js');
const passport = require('passport');
const { checkAuthenticated } = require('../middlewares/userAuthenticate.js')




router.post('/add',checkAuthenticated,addMessage);
router.get('/get',checkAuthenticated,getChat)


module.exports = router;