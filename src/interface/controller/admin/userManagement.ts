import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/user/user";
import userRepositoryImpl from "../../../infra/repositories/user/userRepository";
import { getUsers } from "../../../app/useCase/admin/patients/getAllUsers";
import { AppError } from "../../../utils/error";
import { blockOneUser } from "../../../app/useCase/admin/patients/block-unblockUser";
import { searchUserUsecase, sortUserUsecase } from "../../../app/useCase/admin/patients/searchSortFilter";

const db=userModel //mogo db userModel
const userRepository=userRepositoryImpl(db)// return mongodb methods related to user collection

//get all users
export const getAllUserController = async (req: Request, res: Response) => {
    try {
        const allUsers=await getUsers(userRepository)()
        if(!allUsers)throw new AppError('Somthing went wrong while fetch the users',500)
        res.status(200).json({ users: allUsers })
    }       
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
//block and unblock the user
export const blockOrUnblockUserController = async (req: Request, res: Response) => {
    try {
        const userId:string | undefined=req.query.id as string
        const action:string | undefined=req.query.action as string
        if(!userId || !action)throw new AppError('Not found',404)
    //call the blockOneUser function with db operation and it will retur asyn func with two params for block the user
        const blockedPatiant=await blockOneUser(userRepository)(userId,action)
        if(blockedPatiant===null)throw new AppError('Somthing went wrong while fetch the users',500)
        if(blockedPatiant===true){
            res.status(200).json({ message: 'User blocked succesfully' })
            return
        }else if(blockedPatiant===false){
            res.status(200).json({ message: 'User unblocked succesfully' })
            return
        }
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
//sort the user data with diffriend conditions
export const sortUserController =async(req: Request, res: Response) => {
    try {
        const sortCriteria:object=req.query
        const sortedUser=await sortUserUsecase(userRepository)(sortCriteria)
        res.status(200).json(sortedUser)
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
//sort the user data with diffriend conditions
export const searchUserController=async(req: Request, res: Response) => {
    try {
        const searchQuery=req.query.q as string
        const searchResult=await searchUserUsecase(userRepository)(searchQuery)
        res.status(200).json(searchResult)
    }
    catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
