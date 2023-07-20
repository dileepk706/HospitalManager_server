import { UserRepository } from "../../../../infra/repositories/user/userRepository"

export const getUsers=(userRepository:UserRepository)=>
async ():Promise<object[] | null>=>{
    const users=await userRepository.getAllUsers()
    return users
}
