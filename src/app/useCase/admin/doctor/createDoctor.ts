import { Doctor } from "../../../../domain/entities/doctor/doctor";
import { doctorValidateHelper } from "../../../../domain/entities/doctor/doctorValidateHelper";
import { DoctorRepository } from "../../../../infra/repositories/doctor/doctorRepository";
import { DepartmetRepository } from "../../../../infra/repositories/department/departmentRepository"; 
import { AppError } from "../../../../utils/error";

export const createDoctorUsecase=(doctorRepository:DoctorRepository,departmetRepository:DepartmetRepository)=>
async(doctorData:Doctor):Promise<string | null>=>{
    await departmetRepository.findOneDepartmentById(doctorData.department)//check if the department is exist or not
    const isDOctorExist=await doctorRepository.findDoctorByEmail(doctorData.email)
    if(isDOctorExist)throw new AppError('Doctor is already exist',409)
    const {validatedDoctorData,tempPassword  }=await doctorValidateHelper(doctorData)//validate doctor info and genareate a random password for doc
    const newDoctor=await doctorRepository.createDoctor(validatedDoctorData)
    if(!newDoctor)throw new AppError('somthing went wrong',500)
    return tempPassword
}