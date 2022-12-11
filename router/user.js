const express = require('express');
const router = express.Router();
const {createUser,getUser, login} = require('../Controller/user')
const passport = require('passport')

const { checkAuthenticated } = require('../middlewares/userAuthenticate.js')


router.post('/create',createUser);
router.post('/login',login);
router.get('/get',checkAuthenticated,getUser)

// google authenticate
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/redirect',passport.authenticate('google',{
    successRedirect: "http://localhost:3000/home", 
    failureRedirect: "http://localhost:3000/signup",
}));

module.exports = router;