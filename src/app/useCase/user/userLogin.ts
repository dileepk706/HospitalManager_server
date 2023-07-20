import { UserRepository } from "../../../infra/repositories/user/userRepository"
import {userLoginUserValidate } from "../../../domain/entities/user/userValidationHelper"
import { AppError } from "../../../utils/error"
import {userLoginType} from "../../../interface/controller/user/userLoginController"

type userReturnType={
    token:string;
    status:string,
 }

export const loginUser=(userRepository:UserRepository)=>{
    return async(user:userLoginType):Promise<userReturnType>=>{
         const isUserExist:userLoginType | null=await userRepository.findOneUserByEmail(user.email)//check teh user is already exist 
         if(!isUserExist)throw new AppError('User is not exist',404)
         const UserToken=await userLoginUserValidate(user,isUserExist)//validate the user credentials 
         const verifiedUser={
            token:UserToken,
            status:'Login success',
         }
         return verifiedUser
    }
}