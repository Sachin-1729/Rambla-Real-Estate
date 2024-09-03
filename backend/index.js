// Example using Express.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

//const usersRoute = require('./Routes/User');
const usersRoute = require('./Routes/UserRoute');
const propertyRoute = require('./Routes/PropertyRoute');
const path = require('path');
const port = process.env.PORT || 3000; // You can use environment variables for port configuration


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//MongoDB Connection 
mongoose.connect(process.env.URI).then(() => {
    console.log("connected to db")
    app.listen(process.env.PORT, () => {
        console.log("server running on port" , port)
    })
}).catch((err) => {
    console.log(err)
})



//Routes
app.use('/users', usersRoute);
app.use('/properties', propertyRoute);
  
 




 
