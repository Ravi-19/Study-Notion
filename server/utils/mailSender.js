const nodemailer = require("nodemailer");
require('dotenv').config() ; 

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion || Code with Ravi',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
           console.log("mail info: " , info);
            return info;
    }
    catch(error) {
        console.log("error while sending mail (utils) :  " , error.message);
    }
}


module.exports = mailSender;