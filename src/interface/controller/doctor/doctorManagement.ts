import { Request, Response } from "express";
import { createDoctorUsecase } from "../../../app/useCase/admin/doctor/createDoctor";
import doctorRepositoryIMPL from "../../../infra/repositories/doctor/doctorRepository";
import { doctorModel } from "../../../infra/database/model/doctor/doctor"
import departmentRepositoryIMPL from "../../../infra/repositories/department/departmentRepository";
import { departmentModel } from "../../../infra/database/model/department/department";
import { getAllDoctorUsecase } from "../../../app/useCase/admin/doctor/getSearchSortFilter";
import { AppError } from "../../../utils/error";
import { blockOrUnblockDoctorUsecase } from "../../../app/useCase/admin/doctor/block-unblockDoctor";

export interface Filter {
    name?: object;
    department?: string | undefined;
    consultingFee?: { $gte: number, $lte: number } | undefined;
    sex?: string | undefined;
}

const departmentRepository = departmentRepositoryIMPL(departmentModel)//mongodb query methods of departmet
const doctorRepository = doctorRepositoryIMPL(doctorModel)//mongodb query methods of doctor

export const createDoctorController = async (req: Request, res: Response) => {
    try {
        const doctorData = req.body
        //create new doctor
        const newDoctorPassword = await createDoctorUsecase(doctorRepository, departmentRepository)(doctorData)
        console.log(newDoctorPassword);
        res.status(200).send({ message: 'Doctor create succesfully..', password: newDoctorPassword })
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
export const getAllDoctorSearchFilterSortController = async (req: Request, res: Response) => {
    try {
        //define the sorting and filtering object
        let sortCriteria:object
        let filterData: Filter = {}
        //finding wich i the sort criteria and make a object for mogodb sorting
        if (req.query.sort && req.query.sort === "consultingFee-1") sortCriteria = { consultingFee: -1 }
        else if (req.query.sort && req.query.sort === "consultingFee1") sortCriteria = { consultingFee: 1 }
        else if (req.query.sort && req.query.sort === "yearOfExperiance-1")sortCriteria = { yearOfExperiance: -1 }
        else if (req.query.sort && req.query.sort === "yearOfExperiance1") sortCriteria = { yearOfExperiance: 1 }
        else sortCriteria={}
        //make the filtering object with the request object if the filters available
        if (req.query.name) filterData.name = { $regex: req.query.name as string, $options: 'i' }
        if (req.query.department)  filterData.department = req.query.department as string
        if (req.query.sex)  filterData.sex = req.query.sex as string
        if (req.query.gte && req.query.lte) {
            filterData.consultingFee = { //filtering doctor with fees range
                $gte: parseInt(req.query.gte as string), $lte: parseInt(req.query.lte as string) 
            }
        }
        const doctorsList = await getAllDoctorUsecase(doctorRepository)(filterData, sortCriteria)
        res.status(200).json(doctorsList)
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
//block and unblock the doctor
export const blockOrUnblockDoctorController = async (req: Request, res: Response) => {
    try {
        const doctorId:string | undefined=req.query.id as string
        const action:string | undefined=req.query.action as string
        if(!doctorId || !action)throw new AppError('Not found',404)
    //call the function with db operation and it will retur asyn func with two params for block the user
        const blockedOrUnblockedDoctor=await blockOrUnblockDoctorUsecase(doctorRepository)(doctorId,action)
        if(blockedOrUnblockedDoctor===null)throw new AppError('Somthing went wrong while fetch the users',500)
        if(blockedOrUnblockedDoctor===true){
            res.status(200).json({ message: 'Docotr blocked succesfully' })
            return
        }else if(blockedOrUnblockedDoctor===false){
            res.status(200).json({ message: 'Doctor unblocked succesfully' })
            return
        }
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
