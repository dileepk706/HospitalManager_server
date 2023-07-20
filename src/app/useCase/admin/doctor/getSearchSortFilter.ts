
import { DoctorRepository } from "../../../../infra/repositories/doctor/doctorRepository"
import { Filter } from "../../../../interface/controller/doctor/doctorManagement"

export const getAllDoctorUsecase=(doctorRepository:DoctorRepository)=>{
    return async (filters:Filter,sortCriteria:object):Promise<Object[]>=>{
        const allDoctors=doctorRepository.getAllDoctors(filters,sortCriteria)
        return allDoctors
    }
}