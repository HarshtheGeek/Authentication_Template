//Config folder consists of the configuration files that manage environment specefic settings//

//We created a cloudinary instance which can be used in multiple places now // 

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

//Credentials//
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY 
});


//Exported the module
module.exports = cloudinary ;