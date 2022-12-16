const express = require('express');
const fs = require('fs');
const { nextTick } = require('process');

const app = express();


//// checking that middleware can modify response  object or not
// app.use(function(req,res, next){
//     console.log('in use');
//     res.send1 = res.send;
//     next()
// })

// app.get('/', function(req,res){
//     res.send1('hello');
// })


// synchronous ---> no need of next function
// app.get('/', (req, res) => {
//     throw new Error('BROKEN') // Express will catch this on its own.
//   })


// asynchronous ---> need of next function


  app.get('/', (req, res, next) => {
    setTimeout(() => {
        try {
            console.log("Async code example.")
            throw new Error("Hello Error!")
        } catch (error) { // manually catching
            error.type = 'setTimeout'
            next(error) // passing to default middleware error handler
        }
    }, 1000)
  });


  app.get('/id', (req, res, next) => {
    setTimeout(() => {
        try {
            console.log("Async code example.")
            throw new Error("Hello Error!")
        } catch (error) { // manually catching
            error.type = 'setTime'
            next(error) // passing to default middleware error handler
        }
    }, 1000)
  });
  

  app.use((err,req,res,next)=>{
    if(err.type === 'setTimeout'){
        res.send('setTimeOut');
    }else{
        res.send('End error');
    }
  })





app.listen(3000, function(){
    console.log('listen');
})