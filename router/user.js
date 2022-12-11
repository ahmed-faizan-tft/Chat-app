const express = require('express');
const router = express.Router();
const {createUser,getUser, login} = require('../Controller/user')
const passport = require('passport')


router.post('/create',createUser);
router.post('/login',login);
router.get('/get',passport.authenticate('jwt',{session:false}),getUser)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/redirect',passport.authenticate('google',{
    successRedirect: "http://localhost:3000/home", 
    failureRedirect: "http://localhost:3000/signup",
}));

module.exports = router;