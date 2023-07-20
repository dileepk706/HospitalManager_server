import express,{ Application, NextFunction, Request,Response,ErrorRequestHandler} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import dotenv  from "dotenv";
import path from "path";
import bodyParser,{BodyParser} from "body-parser";
import cors from 'cors';
import morgan from 'morgan';// Middleware to log incoming requests

import connectDB from "./infra/database/dbConfig"
import userRoute from "./interface/routes/user";
import adminRout from "./interface/routes/admin";


const app:Application=express()

app.use(express.json())
// Enable CORS for all routes
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({ path: path.resolve(__dirname, '../.env')});

//mogodb connection
connectDB(process.env.MONGODB_CONNECTION_URL || '');

//setup routes
app.use('/',userRoute)
app.use('/admin',adminRout)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//serving static files 

 


//page not found error handling
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.send(new createHttpError.NotFound())
})
const errorHandler:ErrorRequestHandler=(error,req,res,next)=>{
    res.status(error.status || 500)
    res.send({
        status:res.status || 500,
        message:error.message
    })
}
app.use(errorHandler)

const PORT:number = Number(process.env.PORT) || 3000
const server:Server=app.listen(3000,()=>{console.log(`server is runnin on port ${PORT}`)})