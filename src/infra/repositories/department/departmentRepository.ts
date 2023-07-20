import {MongoDBDepartment} from "../../database/model/department/department"
import { Department } from "../../../domain/entities/admin/deparment";
import { AppError } from "../../../utils/error";
import { ObjectId } from "mongoose";

export type DepartmetRepository = {
    createNewDepartment:(departmentData:string)=>Promise<Department>
    findOneDepartmentByName :(departmentName:string)=>Promise<Department | null> 
    createNewHealthProblem : (departmentId:string,healthProblem:string)=>Promise<Department | null> 
    findDepartmentByHealthProblem:(healthProblem:string)=>Promise<Department | null> 
    findOneDepartmentById:(departmentId:ObjectId)=>Promise<Department | null>  
    findAllDepartment:()=>Promise<object[] | null>
    deletedDepartment:(departmentId:string)=>Promise<boolean >
    getHealthProblems:(healthProblem:string)=>Promise<string[]|null>
};

const departmentRepositoryIMPL=(DepartmentModel:MongoDBDepartment):DepartmetRepository=>{
    // Create a new department document
    const createNewDepartment=async(departmentName:string):Promise<Department>=>{
        const newDeparment = new DepartmentModel({ 
            departmentName:departmentName,
            healthProblems:[]
        })
        const createdDepartment :Department=await newDeparment.save()
        return createdDepartment
    }
    //find department by name
    const findOneDepartmentByName =async (departmentName:string):Promise<Department | null> => {
        const departmentExist:Department | null=await DepartmentModel.findOne({departmentName})        
        return departmentExist
    }
    const findOneDepartmentById =async (departmentId:ObjectId):Promise<Department | null> => {
        const department=await DepartmentModel.findById(departmentId)
        if(!department)throw new AppError('conot find the department',404)
        return department
    }
    //find department by health
    const findDepartmentByHealthProblem = async (healthProblem:string):Promise<Department> =>{
        const department = await DepartmentModel.findOne({
            healthProblems: { $regex: new RegExp(healthProblem, 'i') },
          });
        if(!department)throw new AppError('conot find the department',404)
        return department
    }
    //find all department
    const findAllDepartment= async ():Promise<object[] | null> =>{
        const departments = await DepartmentModel.find({},{departmentName:1})
        return departments
    }
    //create new health problem under the department
    const createNewHealthProblem = async (departmentId:string,healthProblem:string):Promise<Department | null> =>{
        const deparment=await DepartmentModel.findById({_id:departmentId})
        if(!deparment)throw new AppError('Department not found',404)
        deparment.healthProblems?.push(healthProblem)
        await deparment.save()
        return deparment
    }
    //delete one department
    const deletedDepartment=async(departmentId:string):Promise<boolean>=>{
        const deletedDepartMent=await DepartmentModel.deleteOne({_id:departmentId})
        if(!deletedDepartMent)throw new AppError('The user is not exist',404)
        return true
    }
    //search health problems
    const getHealthProblems=async (healthProblem: string): Promise<string[] | null> => {
        interface DepartmentDocument {
            healthProblems: string[];
          }
        //search the health problems list from collection,it 
        const departmentsWithHealthProblems:DepartmentDocument[] = await DepartmentModel.aggregate([
          { $match: { healthProblems: { $regex: healthProblem, $options: 'i' } } },
          { $project: { _id: 0, healthProblems: 1 } },
        ]);
        // Extract the healthProblems arrays from the aggregation result
        const AllhealthProblems: string[] = departmentsWithHealthProblems
          .map((department) => department.healthProblems)
          .flat();
          const filteredHealthProblems = AllhealthProblems.filter(problem => problem.toLowerCase().startsWith(healthProblem.toLowerCase()));
        return filteredHealthProblems;
      };
    return{
        createNewDepartment,findOneDepartmentByName,createNewHealthProblem,findDepartmentByHealthProblem,
        findOneDepartmentById,findAllDepartment,deletedDepartment,getHealthProblems
    }
}

export default departmentRepositoryIMPL;