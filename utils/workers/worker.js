const downloadFileQueue = require('../../config/queue.js');
const http = require('http');
const fs = require('fs');

function workers(){
    try {
        downloadFileQueue.process(async (job,done)=>{
            console.log(`${job.id} ---> `,job.data);
        })
    } catch (error) {
        console.log('Error in workers ',error)
    }
}


downloadFileQueue.on('completed',(job)=>{
    console.log(`${job.id} completed`);
});


module.exports = workers