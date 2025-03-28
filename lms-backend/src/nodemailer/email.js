import { transporter } from "../config/nodemailer-config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, SEND_WELCOME_TEMPLATE } from "./emailTemplate.js";



export const sendVerificationEmail = async(email, verificationToken)=>{
   

    const recipient = email;

    try {
        const response = await transporter.sendMail({
            from:'"Learning Management System" <apitest2561@gmail.com>',
            to:recipient,
            subject:"Please verify your account",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        //console.log("Email sent successfully", response);
    } catch (error) {
        //console.log(`Failed to send email: ${error.message}`);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}




export const sendWelcomeEmail = async(email, username)=>{
    const recipient = email
    
    try{
        const response = await transporter.sendMail({
            from:'"Music App" <apitest2561@gmail.com>',
            to:recipient,
            subject:"Welcome to Music App",
            html:SEND_WELCOME_TEMPLATE,
            category: "Welcome"
        })

        //console.log("Welcome Email sent  successfully", response);
    }
    catch(error){
        //console.log(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
}


export const sendPasswordResetEmail = async(email, resetUrl)=>{
   
    const recipient = email
    try{
        const response = await transporter.sendMail({
            from:'"Music App" <apitest2561@gmail.com>',
            to:recipient,
            subject:"Password Reset Request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        })
        //console.log("Password reset email sent successfully", response);
    }
    catch(error){
        //console.log(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
}


export const sendResetSuccessfulEmail = async(email)=>{
    const recipient = email
    try{
        const response = await transporter.sendMail({
            from:'"Music App" <apitest2561@gmail.com>',
            to:recipient,
            subject:"Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
    }
    catch(error){
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
}