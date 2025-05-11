const cloudinary = require('cloudinary');
const {imageUpload} = require("../helpers/cloudinaryHelper")
const Image = require("../model/image");



const uploadController = async(req,res)=> {
    try{
        if(!req.file){
            return res.status(401).json({
                message : "Please upload the file",
                success : false,
            })
        }

        const {url,publicId} = await imageUpload(req.file.path)

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        await newlyUploadedImage.save();

        res.status(200).json({
            message : "The image has been uploaded successfully",
            success : true,
            data : newlyUploadedImage
        })

    }catch(error){
        return res.status(500).json({
            message : "Something is wrong please try again",
            success : true
        })
    }
}


module.exports = {uploadController}