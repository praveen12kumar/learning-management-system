import {config} from "dotenv";

config({
    path: "./.env"
})


export const NODE_ENV = process.env.NODE_ENV

export const PORT = process.env.PORT

export const JWT_SECRET = process.env.JWT_SECRET

export const MONGO_URI = process.env.MONGO_URI