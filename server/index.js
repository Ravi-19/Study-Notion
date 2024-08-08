const express = require('express');
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mainRouter = require('./routes/index') ; 
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));


// home url for testing  
app.get('/', async (req, res) => {
    return res.status(200).json(
        {
            success : true , 
            message :"server is working fine"
        });
})

// routes 
app.use('/api/v1' ,mainRouter ) ; 


// database connnection 
dbConnect();
// cloudinary connection 
cloudinaryConnect();

app.listen(PORT || 8000, () => {
    console.log(`server is listening on port : ${PORT}`);
})