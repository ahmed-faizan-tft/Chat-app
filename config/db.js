"use strict";

const mongoose = require('mongoose');

const DB_OPTIONS = {
    dbName: process.env.DBNAME
}

const connectdb = ()=>{
    // connecting with database
    return mongoose.connect(process.env.DB_URL,DB_OPTIONS,(err)=>{
        if(err){
            console.log(err); 
            return;
        }
        console.log("Database connected successfully.");
    });
}

module.exports = connectdb;