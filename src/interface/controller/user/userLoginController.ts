import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/user/user";
import userRepositoryImpl from "../../../infra/repositories/user/userRepository";
import { loginUser } from "../../../app/useCase/user/userLogin";
import { ObjectId } from "mongoose";
import { User } from "../../../domain/entities/user/userValidation";
const db = userModel //Instantiate MongoDB connection 
const userRepository = userRepositoryImpl(db)

export type userLoginType={
    email:string;
    password:string
}

export const userLogin = async (req: Request, res: Response) => {
   try 
   {
      const user: User = req.body
      //userRepository contains all dbOperations of user collection
      //login accept the userRepository as parameter and  return another function to login the user
      const userToken=await  loginUser(userRepository)(user)
       console.log(userToken);
      res.status(200).json({message:userToken})
   } 
   catch (error:any) 
   {
      res.status(error.statusCode || 500).json({message:error.message || 'Somthing went wrong'})
   }
}
