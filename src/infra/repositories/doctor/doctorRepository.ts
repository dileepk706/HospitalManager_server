import { Doctor } from "../../../domain/entities/doctor/doctor";
import { AppError } from "../../../utils/error";
import { MongoDBDoctor, doctorModel } from "../../database/model/doctor/doctor";
import { Filter } from "../../../interface/controller/doctor/doctorManagement";

export type DoctorRepository={
    createDoctor:(doctorData: Doctor)=>Promise<Doctor | null>
    findDoctorByEmail :(email: string)=>Promise<Doctor | null> 
    getAllDoctors:(filters:Filter,sortCriteria:object)=>Promise<object[]>
    updateIsBlock:(doctorId:string,action:string)=>Promise<boolean|undefined>
}
const doctorRepositoryIMPL=(DoctorModel:MongoDBDoctor):DoctorRepository=>{

  //create a new doctor
   const createDoctor = async (doctorData: Doctor): Promise<Doctor | null> => {
    const newDoctor=await doctorModel.create(doctorData)
    return newDoctor
  };
  //find One doctor by email
  const findDoctorByEmail = async (email: string): Promise<Doctor | null> => {
    const doctor=await doctorModel.findOne({email})
    return doctor
  };
  //find the all docters
  const getAllDoctors=async(filters:Filter,sortCriteria:any):Promise<object[]>=>{
    
    const allDoctors=await DoctorModel.find(filters).sort(sortCriteria)
    return allDoctors
  }
  const updateIsBlock=async(doctorId:string,action:string):Promise<boolean|undefined>=>{
    //change the isBlocked bool value regards the action
    let isBlocked:boolean =false
    if(action==='block') isBlocked=true 
    if(action==='unblock') isBlocked=false 
    //update the isBlocked field
    const blockedOrUnblockedUser=await DoctorModel.findByIdAndUpdate(doctorId,{isBlocked}, { new: true })
    if(!blockedOrUnblockedUser)throw new AppError('Somthing went wrong when block the user',500)
    return isBlocked
}
    return{ createDoctor,findDoctorByEmail,getAllDoctors,updateIsBlock}
};

export default doctorRepositoryIMPL
 