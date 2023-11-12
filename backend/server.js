const express = require('express');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors")
const todoroute = require('./routes/TODORoutes');


// Initializing Server and port
const server = express();
const port = process.env.PORT || 5000


// Middleware
server.use(cors())
server.use(express.json())
server.use("/todo", todoroute);


// Initializing Port for I/O for server..
server.listen(port, () => {
    // Connecting to MongoDB
    mongoose.connect(process.env.MURL)
        .then(() => console.log("Mongo DB Connected..."))
        .catch((error) => console.log(error));
    console.log("Server is running on port... " + port)
});