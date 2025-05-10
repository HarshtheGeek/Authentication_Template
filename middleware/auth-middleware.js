require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');

const Authmiddleware = (req, res, next) => {

    // Extracting the authorization header
    const authHeader = req.header("authorization") || req.header("Authorization");
    console.log(authHeader);

    // Fetching the bearer token
    const token = authHeader && authHeader.split(" ")[1];

    // If the token doesn't exist, the user won't be granted access
    if (!token) {
        return res.status(401).json({
            message: "Access denied. Please try again later."
        });
    }

    try {
        // Verifying and decoding the token using the secret key
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Assigning the decoded token data to the request object for downstream use
        req.userInfo = decodeToken;

        // Proceeding to the next middleware or route handler
        next();

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred. Please try again."
        });
    }
};

module.exports = Authmiddleware;
