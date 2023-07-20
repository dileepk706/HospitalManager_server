import { DoctorRepository } from "../../../../infra/repositories/doctor/doctorRepository"

export const blockOrUnblockDoctorUsecase=(userRepository:DoctorRepository)=>
async (userId:string,action:string):Promise<boolean | undefined>=>{
    const users=await userRepository.updateIsBlock(userId,action)
    return users
}