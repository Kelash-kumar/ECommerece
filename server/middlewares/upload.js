const multer = require('multer');
const path = require('path');


const storage = multer.memoryStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads');
    },
    filename:(req,file,cb) =>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName=file.originalname.split('.')[0];
        cb(null, fileName +'-'+ uniqueSuffix + path.extname(file.originalname));
    
    }
});


const uploads = multer({
    storage:storage,
    limits:{fileSize}
});

module.exports = uploads;