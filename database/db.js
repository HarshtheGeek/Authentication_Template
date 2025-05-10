// Importing the necessary packages
require('dotenv').config();
const mongoose = require('mongoose');

// Trying to make a connection
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("The connection has been made successfully");
    } catch (error) {
        console.error("The connection cannot be made. Please try again later.", error);
        process.exit(1);
    }
};

// Exporting this module
module.exports = connectToDB;
