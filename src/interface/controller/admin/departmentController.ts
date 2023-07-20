import { Request, Response } from "express";
import { addOneDepartment } from "../../../app/useCase/admin/department/addDeparmet";
import { departmentModel } from "../../../infra/database/model/department/department";
import departmentRepositoryIMPL from "../../../infra/repositories/department/departmentRepository";
import { addNewHealthProblem } from "../../../app/useCase/admin/healthProblem/addHealthProblem";
import { getAllDepartment_Usecase,getDepartmentByHealthProblem_Usecase } from "../../../app/useCase/admin/department/getSearchSortFIlter";
import { deleteDepartmentUsecase } from "../../../app/useCase/admin/department/deleteDpartment";
import { Error } from "mongoose";

const departmentRepository = departmentRepositoryIMPL(departmentModel)

export const addDepartmentController = async (req: Request, res: Response) => {
   try {
      const departmentName: string = req.body.departmentName;
      const newDepartment = await addOneDepartment(departmentRepository)(departmentName)
      if (!newDepartment) {
         res.status(500).json({ message: 'Somthing went wrong' })
         return
      }
      res.status(200).json({ message: 'Department added succesfully' })
   }
   catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
   }
}

export const addHealthProblemController = async (req: Request, res: Response) => {
   try {
      const departmentId: string = req.params.departmentId
      const healthProblem: string = req.body.concern
      // Check if healthProblem is empty or contains only whitespace
      if (!healthProblem || !departmentId || /^\s*$/.test(healthProblem)) {
         res.status(400).json({ message: 'health problem is requred' })
         return
      }
      const newConcern = await addNewHealthProblem(departmentRepository)(departmentId, healthProblem)
      if (!newConcern) {
         res.status(500).json({ message: 'Somthing went wrong' })
         return
      }
      res.status(200).json({ message: 'Health Problem added succesfully' })
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
   }
}

export const getAllDepartmentController=async (req: Request, res: Response) => {
   try {
      const departments=await getAllDepartment_Usecase(departmentRepository)()
      res.status(200).json({ message:'Ok',departments})
   }
   catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
   }
}
export const getDepartmentByHealthProblem_Controller=async (req: Request, res: Response) => {
   try {
      const healthProblem:string=req.query.healthProblem as string
      const departments=await getDepartmentByHealthProblem_Usecase(departmentRepository)(healthProblem)
      res.status(200).json({ message:'Ok',departments})
   }
   catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
   }
}

export const deleteDepartmentController=async(req: Request, res: Response)=>{
   try {
      const departmentId:string|undefined=req.params.departmentId
      const deletedDepartment=deleteDepartmentUsecase(departmentRepository)(departmentId)
      res.status(200).json({ message:'Department deleted succusfully',})
   } catch (error:any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
   }
}