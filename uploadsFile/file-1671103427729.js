const fs = require('fs')
const path = require('path')


let run = 0;


function write(){
    fs.writeFile(`${path.dirname(__filename)}/files/index.js`,'Console.log("Hello world");',function(err){
        if(err){
            console.log(err);
        }
    });    
}


function read(){

    fs.readFile(`${path.dirname(__filename)}/files/index.js`,{encoding: 'utf-8'},function(err, data){
        if(err){
            return console.log(err);
        }
        console.log(data);
    }); 
}

function append(){
    
    var fs = require("fs");
    var buf = Buffer.alloc(1024)   
    
    
    fs.open(`${path.dirname(__filename)}/files/index.js`, 'r+', function(err, fd) {
       if (err) {
          return console.error(err);
       }

       fs.read(fd, buf, 0, buf.length, 6, function(err, bytes){
          if (err){
             console.log(err);
          }
          console.log(bytes + " bytes read");

          // Print only read bytes to avoid junk.
          if(bytes > 0){
             console.log(buf.slice(0, bytes).toString());
          }
       });
    });
}



// write();
append()
// read();