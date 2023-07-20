import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/user/user";
import userRepositoryImpl from "../../../infra/repositories/user/userRepository";
import { signupSuer } from "../../../app/useCase/user/userSignup";
import { User } from "../../../domain/entities/user/userValidation";
const db = userModel //Instantiate MongoDB connection 
const userRepository = userRepositoryImpl(db)

export const userSignup = async (req: Request, res: Response) => {
   try 
   {
      const user: User = req.body
      //userRepository contains all dbOperations of user collection
      //signupSuer accept the userRepository as parameter and  return another function to create a new User
      const createdUser=await  signupSuer(userRepository)(user)
      if(!createdUser)
      {
         res.status(500).json({message:'Somthing went wrong'})
      }
      res.status(200).json({message:'User created succussfully'})
   } 
   catch (error:any) 
   {
      res.status(error.statusCode || 500).json({message:error.message || 'Somthing went wrong'})
   }
}
