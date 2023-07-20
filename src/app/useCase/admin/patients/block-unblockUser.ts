import { UserRepository } from "../../../../infra/repositories/user/userRepository"
import { AppError } from "../../../../utils/error"
import { User } from "../../../../domain/entities/user/userValidation"

export const blockOneUser=(userRepository:UserRepository)=>
async (userId:string,action:string):Promise<boolean | undefined>=>{
    const users=await userRepository.updateIsBlock(userId,action)
    return users
}