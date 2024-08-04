
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email , email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({success:false,
            message:'Your Email is not registered with us'});
        }
        //generate token 
        const token  = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new:true});
        //create url
        const url = `${process.env.CLIENT_BASE_URL}/update-password/${token}`
        //send mail containing the url
        await mailSender(email, 
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password',
        });
    }
    catch(error) {
        console.log("error occured while resetting password: " , error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset password mail'
        })
    }



   
}


//resetPassword\

exports.resetPassword = async (req, res) => {
    try {
          //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) {
            return res.satus(401).json({
                success:false,
                message:'Password and confirm password is not matching',
            }); 
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Token is invalid , please generate another link to reset password',
            });
        }
        //token time check 
        if( userDetails.resetPasswordExpires < Date.now()  ) {
                return res.json({
                    success:false,
                    message:'Token is expired, please generate another link to reset password',
                });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(201).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset password on mail'
        })
    }
}