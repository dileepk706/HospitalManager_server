import { DepartmetRepository } from "../../../../infra/repositories/department/departmentRepository"
import { Department, validateDepartmentData } from "../../../../domain/entities/admin/deparment"
import { AppError } from "../../../../utils/error"

export const addNewHealthProblem=(departmetRepository:DepartmetRepository)=>
async (departmentId:string,healthProblem:string):Promise<Department | null>=>{
    //create New Health Concern
    const isDepartmentExist:Department | null=await departmetRepository.findDepartmentByHealthProblem(healthProblem)
    if(isDepartmentExist)throw new AppError("Health problem already exist in the list",409)
    const newHealthProblem=await departmetRepository.createNewHealthProblem(departmentId,healthProblem)
    return newHealthProblem
}