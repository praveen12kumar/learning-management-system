import { UserService } from "../services/index.js";
import { NODE_ENV } from "../config/config.js";


const userService = new UserService();
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: NODE_ENV == "production"
}



//Validate user input (fullName, email, password).
//Check if the email already exists in the database.
//Hash the password using bcrypt.
//Upload the profile picture to Cloudinary.
//Save user details in the database.
//Generate a JWT token and send it in a cookie response.


export const signUp = async(req, res)=>{    
    
    const {fullName, email, password} = req.body;
    const localImagePath = req?.file?.path;

    if(!fullName || !email || !password){
        return res.status(403).json({
            success:false,
            data:{},
            message:"All fields are required",
            err:{}
        })
    }
    try {
        const response  = await userService.signup(fullName, email, password, localImagePath);

        res.cookie("token", response.token, cookieOptions);

        res.status(201).json({
            success: true,
            data: response.newUser,
            message: "User created successfully",
            err: {}
        });
    } 
    catch (error) {
        if(error.message == "user already exists") {
            return res.status(409).json({
                success: false,
                data: {},
                message: "User already exists",
                err: error.message
            })
        }
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}

// Validate user credentials (email & password).
// Find the user by email in the database.
// Compare passwords using bcrypt.compare().
// Generate a JWT token if credentials are valid.
// Store the token in a cookie and return user details.


export const signIn = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(403).json({
            success:false,
            data:{},
            message:"All fields are required",
            err:{}
        })
    }
    try {
        const response = await userService.signIn(email, password);

        res.cookie("token", response.token, cookieOptions);

        res.status(200).json({
            success: true,
            data: response.user,
            message: "User logged in successfully",
            err: {}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}


// logout
// clear the cookie
// return success message


export const logout = async(req, res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({
        success: true,
        data: {},
        message: "User logged out successfully",
        err: {}
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err:error.message
        })
    }
}


// forogt password
// get email from req.body
// check the email is correct
// 