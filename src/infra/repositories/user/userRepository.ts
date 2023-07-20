import {MongoDBUser} from "../../database/model/user/user"
import { User } from "../../../domain/entities/user/userValidation";
import {userLoginType} from "../../../interface/controller/user/userLoginController"
import { AppError } from "../../../utils/error";

export type UserRepository = {
    createUser: (user:User) => Promise<User>;
    findOneUserByEmail:(email:string)=>Promise<userLoginType | null>;
    getAllUsers:()=>Promise<object[] | null>;
    updateIsBlock:(userId:string,action:string)=>Promise<boolean|undefined>
    sortUser: (sortCriteria:any)=>Promise<object[] >
    searchUser:(searchQuery:string)=>Promise<object[]>

  };
  

const userRepositoryImpl=(UserModel:MongoDBUser):UserRepository=>{

    const createUser=async(user:User):Promise<User>=>{
        let newUser=await UserModel.create(user)
        return newUser
    }
    const findOneUserByEmail=async (email:string):Promise<userLoginType | null>=>{
        const user:userLoginType | null =await UserModel.findOne({email})
        return user;
    }
    const getAllUsers=async():Promise<object[]>=>{
        const allUsers:object[] | null=await UserModel.find({},{password:0})
        if(!allUsers)throw new AppError('Somthing went wrong when block the user',500)
        return allUsers
    }
    const updateIsBlock=async(userId:string,action:string):Promise<boolean|undefined>=>{
        //change the isBlocked bool value regards the action
        let isBlocked:boolean | undefined
        if(action==='block') isBlocked=true 
        if(action==='unblock') isBlocked=false 
        //update the isBlocked field
        const blockedUser=await UserModel.findByIdAndUpdate(userId,{isBlocked}, { new: true })
        if(!blockedUser)throw new AppError('Somthing went wrong when block the user',500)
        return isBlocked
    }
    //sorting the user data with diff critirea 
    const sortUser=async(sortCriteria:any):Promise<object[] >=>{
        const sortedUsers = await UserModel.find().sort(sortCriteria);
        return sortedUsers
    }
    //search the user data 
    const searchUser=async(searchQuery:string):Promise<object[]>=>{
        const searchResult = await UserModel.find({ name: { $regex: searchQuery, $options: 'i' } });
        return searchResult
    }
    return {createUser,findOneUserByEmail,getAllUsers, updateIsBlock,sortUser,searchUser}
}

export default userRepositoryImpl;
