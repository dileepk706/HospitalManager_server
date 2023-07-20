import { UserRepository } from "../../../../infra/repositories/user/userRepository"
import { AppError } from "../../../../utils/error"
import { User } from "../../../../domain/entities/user/userValidation"

export const searchUserUsecase=(userRepository:UserRepository)=>
async (searchQuery:string):Promise<object[] | null>=>{
    const users=await userRepository.searchUser(searchQuery)
    return users
}
export const sortUserUsecase=(userRepository:UserRepository)=>
async (sortCriteria:object):Promise<object[] | null>=>{
    const users=await userRepository.sortUser(sortCriteria)
    return users
}
