const mongoose = require('mongoose');

// Created a User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Only allows 'user' or 'admin'
        default: 'user'
    }
}, { timestamps: true });

// Export the mongoose model for use elsewhere
module.exports = mongoose.model('User', UserSchema);
