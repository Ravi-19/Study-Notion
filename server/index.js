const express = require('express') ; 
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect') ; 
require('dotenv').config() ; 

const app = express() ; 
const PORT = process.env.PORT  ; 

app.get('/' , async(req , res) => {
    return res.send("server is working well") ;
})



// database connnection 
dbConnect() ; 
// cloudinary connection 
cloudinaryConnect() ; 

app.listen(PORT || 8000 , ()=> {
    console.log(`server is listening on port : ${PORT}`) ; 
})