const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const db = require('./config/db.js')
const {connection} = require('./utils/socketio/socketEvents.js')
const passportJWT = require('./config/passport_jwt.js');
const passportGoogle = require('./config/passport_google.js');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 8080
const cookieParser = require('cookie-parser')


// create express app
const app = express();

// connecting database
db();

app.use(cors({origin:'http://localhost:3000'}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cookieParser());
// app.use(session({
//     name:'gchatid',
//     secret: '44w52fw2r2re55r62wf6',  // by using this secret encryption and decryption is done
//     saveUninitialized: false, // if user have not logged in so no need to store any data
//     resave: false,            
//     cookie:{
//         maxAge: (1000 * 60 * 100),
//         secure: false,
//         path:'/'
//     },
// }));


// app.use(passport.initialize());
// app.use(passport.session());


// endpoints
app.use('/',require('./router'))





// server started
const server = app.listen(port, (err)=>{
    if(err){
        console.log(`Error occured in listening ${err}`);
        return;
    }
    console.log(`Listen at http://localhost:${port}`);
});


// socket server
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
    },
});


connection(io)