//In a backend project, a helpers folder typically contains utility functions or modules that are used across different parts of the application. These are not tied to a single feature or domain, but instead provide reusable support logic that simplifies common or repetitive tasks.

const cloudinary = require('../config/cloudinary')

//It takes parameter of the path where the file which needs to be uploaded is stored
const imageUpload = async(filePath) => {
    try{
        //Uses cloudinary uploader to upload the file located at the file path
        const result = await cloudinary.uploader.upload(filePath);

        //Returns an object with two key pieces of information from the result
        return{
            url  : result.secure_url, //url: the secure (HTTPS) URL of the uploaded image.
            publicId : result.public_id //publicId: the unique Cloudinary ID used to access/delete the image later.
        }
    }
    //Catches the error if any
    catch(error){
        console.error("Error while uploading the image")
    }

}



//Exported this helper function
module.exports = {imageUpload}