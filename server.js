// Import necessary packages
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authroute = require("./routes/auth-routes");
const homeroute = require("./routes/home-route");
const adminroute = require("./routes/admin-routes");
const uploadImageRoute = require("./routes/image-routes");


const app = express();

// Middleware to parse JSON
app.use(express.json());


//Parent route for our authentication
app.use("/api/auth",authroute);
app.use("/api/home",homeroute);
app.use("/api/admin",adminroute);
app.use("/api/image",uploadImageRoute);

// Define port
const PORT = process.env.PORT || 4000;

// Connect to the database
connectToDB()
  .then(() => {
    // Start the server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database please try again later:', error.message);
  });
