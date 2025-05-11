const express = require('express');
const { default: mongoose } = require('mongoose');

//Created a schema on what things are required :
const ImageSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true,
    },
    publicId : {
        type : String,
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    }
})


module.exports = mongoose.model('Image',ImageSchema);