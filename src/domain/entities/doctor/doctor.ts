import { ObjectId } from "mongoose";
import { AppError } from "../../../utils/error";

export type Doctor = {
    name?:string;
    email: string;
    password: string;
    phone: string;
    image: string;
    address: string;
    dob: Date;
    isBlocked:boolean;
    isMailVarified: boolean;
    sex:string;
    designation:string;
    department:ObjectId;
    yearOfExperiance:number;
    biography:string;
    consultingFee:number;
    rating:number
}


export const validateDoctor=(passwordHashing:Function,generateRandomPassword:Function)=>{
    return async(doctor:Doctor)=>{
    if(!doctor.name)throw new AppError('name is required',400)
    if(!doctor.email )throw new AppError('email is required',400)
    if(!doctor.phone )throw new AppError('phone is required',400)
    if(!doctor.sex )throw new AppError('sex is required',400)
    if(!doctor.yearOfExperiance )throw new AppError('Experiance  is required',400)
    if(!doctor.department )throw new AppError('department  is required',400)
    if(!doctor.designation )throw new AppError('designation  is required',400)
    if(!doctor.consultingFee )throw new AppError('consulting fee  is required',400)
    // genarate password 
    const tempPassword=generateRandomPassword(4)
    const password=await passwordHashing(tempPassword)
    const validatedDoctorData={...doctor,password}
    return{ validatedDoctorData,tempPassword   }
}


     

}