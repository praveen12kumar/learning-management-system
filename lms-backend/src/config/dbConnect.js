import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
import { DB_NAME } from "../../constant.js";


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error",error);
        process.exit(1);
    }
}


export default connectDB;