import { UserRepository } from "../../../infra/repositories/user/userRepository"
import { User } from "../../../domain/entities/user/userValidation"
import { userCreate } from "../../../domain/entities/user/userValidationHelper"
import { AppError } from "../../../utils/error"

export const signupSuer=(userRepository:UserRepository)=>{
    //return function for create new user 
    return async(user:User):Promise<User>=>{
        const newUser:User=await userCreate(user)
        const isUserExist=await userRepository.findOneUserByEmail(user.email)        
        if(isUserExist)throw new AppError('User is already exist',409)
        const createdUser=await userRepository.createUser(newUser)//this method will create a new user 
        return createdUser
    }
}