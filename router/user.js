const express = require('express');
const router = express.Router();
const {createUser,getUser, login, resetPassword} = require('../Controller/user')
const passport = require('passport')

const { checkAuthenticated } = require('../middlewares/userAuthenticate.js')


router.post('/create',createUser);
router.post('/login',login);
router.get('/get',checkAuthenticated,getUser)
router.post('/reset', resetPassword);

// google authenticate
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/redirect',passport.authenticate('google',{
    failureRedirect: "http://localhost:3000/signup",
    session:false
}), function(req,res){
    if(req.user.isExist){
        return res.redirect(`http://localhost:3000/login`)
    }
    return res.redirect(`http://localhost:3000/reset/${req.user.id}`)
});

module.exports = router;