import { Request, Response } from "express";
import {CustomRequest} from "../../middlewares/authMiddleware"
import { getAllDepartment_Usecase, getAllHealthProblems_Usecase } from "../../../app/useCase/admin/department/getSearchSortFIlter";
import departmentRepositoryIMPL from "../../../infra/repositories/department/departmentRepository";
import { departmentModel } from "../../../infra/database/model/department/department";

const departmentRepository=departmentRepositoryIMPL(departmentModel)

export const getAllDepartments = async (req: CustomRequest, res: Response) => {
   try 
   {
      const departments=await getAllDepartment_Usecase(departmentRepository)()
      res.status(200).json(departments)
   } 
   catch (error:any) 
   {
      res.status(error.statusCode || 500).json({message:error.message || 'Somthing went wrong'})
   }
}
export const getHealthProblems_Controller = async (req: CustomRequest, res: Response) => {
   try 
   {  
      const healthProblem:string=req.query.healthProblem as string
      console.log(healthProblem);
      
      const departments=await getAllHealthProblems_Usecase(departmentRepository)(healthProblem)
      res.status(200).json(departments)
   } 
   catch (error:any) 
   {
      res.status(error.statusCode || 500).json({message:error.message || 'Somthing went wrong'})
   }
}