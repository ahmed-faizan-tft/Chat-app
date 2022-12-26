'use stick'
const express = require('express');
var cors = require('cors')
const connectDB = require('./src/models/db.js');
const app = express();
const port = process.env.PORT || 3200;


app.use(cors())
app.use(express.json());

connectDB();
app.use('/',require('./src/moneyManagement/v1/router'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in listening: ${err}`);
        return;
    }
    console.log(`Application listen at port number ${port}`)
})