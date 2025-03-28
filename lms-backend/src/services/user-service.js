
import { UserRepository } from "../repository/index.js";
import uploadOnCloudinary from "../config/cloudinary-config.js";
import {sendVerificationEmail, sendWelcomeEmail } from "../nodemailer/email.js"

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(fullName, email, password, localFilePath) {
            const existingUser = await this.userRepository.findOne({email});
            if(existingUser){
                throw new Error("User already exists");
            }

            const result = await uploadOnCloudinary(localFilePath, "profile");
            
            if(!result){
                throw{
                    success:false,
                    message:"Profile upload failed",
                }
            }

            const newUser = await this.userRepository.create({fullName, email, password, 
                avatar:{
                    public_id:result?.public_id,
                    secure_url:result?.secure_url
                }
            });

            const token = await newUser.generateToken();
            
            // send verification otp to mail

            sendVerificationEmail(newUser?.email, newUser?.verifyPasswordOTP)
            
            return {token, newUser};
    }


    async signIn(email, password) {
        const user = await this.userRepository.findOne({email});
        if(!user){
            throw new Error("User does not exist");
        }

        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        const token = await user.generateToken();

        

        return {token, user};
    }


    // get Profile
    async getProfile(userId) {
        const user = await this.userRepository.get(userId);
        if(!user){
            throw new Error("User does not exist");
        }
        return user;
    }



}

export default UserService;