import { UserService } from "../services/index.js";

const userservice = new UserService();


export const getProfile = async(req, res) => {
  
    try {
        const response = await userservice.getProfile(req.user._id);
        res.status(200).json({
            success: true,
            data: response,
            message: "User profile fetched successfully",
            err: {} 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}


