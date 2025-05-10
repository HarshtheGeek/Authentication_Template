const express = require('express');
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


//Created a function
const RegisterUser = async (req, res) => {
    try{
        const {username,email,password,role} = req.body ;
        const Registereduser = await User.findOne({email})
        if(Registereduser){
            return res.status(409).json({
                message : "The user is already registered please try again",
                success : false,
            })
        }

        const GenSalt =  await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(password,GenSalt);


        const NewlyCreatedUser = new User({
            username : username,
            email : email,
            password : HashPassword,
            role : role || 'user'
        });

        await NewlyCreatedUser.save();
        if(NewlyCreatedUser){
            res.status(201).json({
                message : "The user has been registered successfully",
                success : true,
            })
        }
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message  :"some error occured please try again later"
        })
    }
};

const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login request for:", username);

        const LoggedinUser = await User.findOne({ username });
        if (!LoggedinUser) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, LoggedinUser.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "The password does not match, please try again",
                success: false,
            });
        }

        const accesstoken = jwt.sign(
            {
                userId: LoggedinUser._id,
                username: LoggedinUser.username,
                role: LoggedinUser.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accesstoken,
        });
    } catch (error) {
        console.log("Error in login:", error.message);
        return res.status(500).json({
            message: "Unauthorized access. Please try again later.",
            success: false,
        });
    }
};



module.exports = {RegisterUser,LoginUser}




