
const mongoose = require('mongoose');
const Usermodel = require("../Models/Usermodel");
const ForgotPassword = require("../Models/ForgotPassword");

const sgMail = require('@sendgrid/mail');

// Set the API key
sgMail.setApiKey('Your API');

const sendEmail = async (link , email) => {
    const msg = {
        to: 'amrishtiwari9984@gmail.com',         // Recipient's email
        from: 'amrishtiwari9984@gmail.com',      // Verified sender's email
        subject: 'Reset Password Link',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>Your reset password link is: ' + link + '</strong>',
    }; 

    try { 
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error('Response error:', error.response.body);
        }
    }
};

//sendEmail();

 
async function findUserByEmail(req, res) {
    
   const email = req.body.email;
   const user = await Usermodel.findOne({email});
   console.log("user finding on the basis of forgot password" , user)
   const token = Math.floor(100000 + Math.random() * 900000);
   if(user)
   { 
     
     const forgotfield = await ForgotPassword.create({
        email: email,
        token: token,
         
     })
const Link = `http://localhost:3000/resetpassword?token=${token}` 
    sendEmail(Link , email)

     res.status(200).json({ forgotfield });   
    
   } 
   else
   { 
    res.status(400).json({ message: "User not found" });

   }

  

}



async function resetpassword(req , res)
{
    const token = req.params.token; // Access the token from the URL path
    console.log('Token:', token);
    console.log(req.body)
   
    const ResetPasswordUser = await ForgotPassword.findOne({token});
    if(ResetPasswordUser && ResetPasswordUser.status == 1)
    {
       console.log(ResetPasswordUser , "User ka detail token field se Mila")
      
      const UserDetail = await Usermodel.findOne({email: ResetPasswordUser.email});
       console.log("User ka detail User Field se Mila", UserDetail)
       UserDetail.password = req.body.password;
       await UserDetail.save();
       ResetPasswordUser.status = 0;
       await ResetPasswordUser.save();
       res.status(200).json({ message: "Password Reset Successfully" });
       
    }

 
}

module.exports = { findUserByEmail , resetpassword };

