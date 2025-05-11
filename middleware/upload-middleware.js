const multer = require('multer');


const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, uploads)
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});


//file filter function 
const checkFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new Error('Not matched please try again later'))
    }
}


module.exports = multer({
    storage : storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 5 *1024 *1024
    }
})