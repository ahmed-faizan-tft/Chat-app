const express = require('express');
const router = express.Router();
const {addMessage, getChat} = require('../Controller/chat.js');
const passport = require('passport');

checkAuthenticated = (req, res, next) => {
    console.log('checkAuthenticated', checkAuthenticated);
    console.log(req.session)
    if (req.isAuthenticated()) { return next() }
    console.log(req.isAuthenticated(), )
  }

router.post('/add',passport.authenticate('jwt',{session:false}),addMessage);
router.get('/get',passport.authenticate('jwt',{session:false}),getChat)
router.get('/getByGoogle',checkAuthenticated, getChat)


module.exports = router;