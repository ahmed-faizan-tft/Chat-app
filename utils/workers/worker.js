const downloadFileQueue = require('../../config/queue.js');
const path = require('path')

const fs = require('fs');
const User = require('../../Model/user');


function workers(){
    try {
        downloadFileQueue.process(async (job,done)=>{

            let userFiles = await User.findById(job.data.id,{files:1});
            const filePath = userFiles.files[userFiles.files.length-1];

            fs.readFile(`${path.dirname(__filename)}/../..${filePath}`, function(err,data){
                if(err){
                    console.log(err);
                    return;
                }
                socketInstance.to(job.data.socketId).emit('downloadFile',data)
            })
            done()
        })
    } catch (error) {
        console.log('Error in workers ',error)
    }
}


downloadFileQueue.on('completed',(job)=>{
    console.log(`${job.id} completed`);
});


module.exports = workers