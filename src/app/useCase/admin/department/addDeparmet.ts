import { DepartmetRepository } from "../../../../infra/repositories/department/departmentRepository"
import { Department, validateDepartmentData } from "../../../../domain/entities/admin/deparment"
import { AppError } from "../../../../utils/error"

export const addOneDepartment=(departmetRepository:DepartmetRepository)=>
async (departmentName:string):Promise<Department>=>{
    const dapartmentNameValidate:string=validateDepartmentData(departmentName)//validate the depart ment name
    const isDepartmentExist:Department | null=await departmetRepository.findOneDepartmentByName(departmentName)
    if(isDepartmentExist)throw new AppError('The department is already exist',409)
    const newDepartment:Department | null=await departmetRepository.createNewDepartment(dapartmentNameValidate)
    return newDepartment
}