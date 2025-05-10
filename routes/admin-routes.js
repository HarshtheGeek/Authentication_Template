const express = require('express'); 
const Authmiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const router = express.Router(); 


router.get("/welcome" , Authmiddleware, isAdminUser, (req,res)=>{
    res.status(200).json({
        message : " Welcome to the home screen admin",
        success : true,
    });
});



module.exports = router; 




