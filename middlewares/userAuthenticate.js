const jwt = require('jsonwebtoken');
const User = require('../Model/user.js');

checkAuthenticated = async (req, res, next) => {
    try {
        
        if(req.headers && req.headers.authorization.split(' ')[1]){
            var decoded = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
            const user = await User.findById(decoded.value).select({_id:1, username:1, email:1})
            if(user){
                req.user = user;
                next()
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'unauthorized'
                })
            }
            
        }else{
            // will continue working with google auth
        }
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized1'
        })
    }
}


module.exports = {
    checkAuthenticated
}