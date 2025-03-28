import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {PORT} from "./config/config.js";
import connectDB from './config/dbConnect.js';
import apiRoutes from "./routes/index.js";


config({path:'./.env'});


const app = express();
app.use(express.json({extended: true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api/', apiRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// routes




const setupAndStartServer = function(){
    app.listen(PORT, async()=>{
        console.log(`Server started on port: ${PORT}`);
        await connectDB();
        console.log("Database connected");
    });
};

setupAndStartServer();

