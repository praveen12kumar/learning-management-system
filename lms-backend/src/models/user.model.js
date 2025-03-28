import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        maxLength:[20,"Name must be less than 20 characters"],
        minLenfth:[5, "Name must be more than 5 characters"],
        trim: true,
        lowerCase: true
    },
    email:{
        type:String,
        required: [true,"Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        match:[/\S+@\S+\.\S+/, 'Please fill a valid email'],
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        minLength:[5, "Password must be at least 8 characters"],
        select: false,
        trim: true
    },
    avatar:{
        public_id:{
            type: String,
        },
        secure_url:{
            type:String,
        } 
    },
    role:{
        type: String,
        enum:["USER", "ADMIN"],
        default:"USER"
    },

    isVerified:{
        type: Boolean,
        default: false
    },

    resetPasswordToken:String,

    resetPasswordTokenExpiry:String,

    verifyPasswordOTP: String,

    verifyPasswordOTPExpiy:Date,

    subscription:{
        id:String,
        status: String
    }
},{
    timestamps:true,
});


userSchema.pre('save', async function(next){
    if(!this.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);
        this.password = encryptedPassword;

        const verToken = Math.floor(100000 + Math.random() * 900000).toString();
        this.verifyPasswordOTP = verToken;
        this.verifyPasswordOTPExpiy = 15 * 60 * 1000;

        if(!this.avatar.secure_url){
            const newName = this.fullName.split(" ").join("");
            this.avatar.public_id = newName;
            this.avatar.secure_url = `https://robohash.org/${newName}`
        }
        
        next();
    } catch (error) {
        console.log("Error saving user",error);
        next(error);
    }  
})

userSchema.methods.comparePassword =  function(password){
    const result =  bcrypt.compareSync(password, this.password);
    return result;
}


userSchema.methods.generateToken = async function(){
    const token = await jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,

    }, JWT_SECRET, {expiresIn: "1d"});
    return token;
}


const User = mongoose.model('users', userSchema );

export default User;