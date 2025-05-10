require('dotenv').config();
const express = require('express');
const Authmiddleware = require('../middleware/auth-middleware');
const router = express.Router();

// Protected Route
router.get("/welcome", Authmiddleware, (req, res) => {
    const {username,role,userId} = req.userInfo;
    res.json({
        _id : userId,
        username,
        role
    })
    console.log("Welcome to the home screen, your code is working properly");
    
});

module.exports = router;
