

import { DepartmetRepository } from "../../../../infra/repositories/department/departmentRepository"
import { Department, validateDepartmentData } from "../../../../domain/entities/admin/deparment"
import { AppError } from "../../../../utils/error"

export const getAllDepartment_Usecase=(departmentRepository:DepartmetRepository)=>
async ():Promise<object[] | null>=>{
    const allDepartments=await departmentRepository.findAllDepartment()
    return allDepartments
}
export const getDepartmentByHealthProblem_Usecase=(departmentRepository:DepartmetRepository)=>
async (healthProblem:string):Promise<Department>=>{
    // const allDepartments=await departmentRepository.findAllDepartment()
    const allDepartments=await departmentRepository.findDepartmentByHealthProblem(healthProblem)
    if(!allDepartments)throw new AppError('conot find the department',404)
    return allDepartments
}
export const getAllHealthProblems_Usecase=(departmentRepository:DepartmetRepository)=>
async(healthProblem:string):Promise<string[]|null>=>{
    const healthProblems=await departmentRepository.getHealthProblems(healthProblem)
    return healthProblems
}