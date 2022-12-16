const multer  = require('multer')
const path = require('path');
const Base_URL = `${path.dirname(__filename)}/..`


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('destination',file);
      cb(null, `${Base_URL}/uploadsFile`)
    },
    filename: function (req, file, cb) {
    const fileExtention = file.originalname.split('.')[1];
      const filename = `file-${Date.now()}`
       cb(null, `${filename}.${fileExtention}`);
    }
  })
  
const upload = multer({ storage: storage });

module.exports = {
    upload,
    Base_URL
}