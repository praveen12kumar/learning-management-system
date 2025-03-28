import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const authenticate = (req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(403).json({
                success: false,
                data: {},
                message: "Unauthenticated user, Token missing",
                err: {}
            })
        }
        const user = jwt.verify(token, JWT_SECRET );

        if(!user){
            return res.status(401).json({
                success: false,
                data: {},
                message: "Invalid token",
                err: {}
            })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}