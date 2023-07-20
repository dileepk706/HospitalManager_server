import { DepartmetRepository } from "../../../../infra/repositories/department/departmentRepository"

export const deleteDepartmentUsecase=(departmentRepotory:DepartmetRepository)=>
async (deparmentId:string):Promise<boolean>=>{
    const deletedDepartment=await departmentRepotory.deletedDepartment(deparmentId)
    return deletedDepartment
}