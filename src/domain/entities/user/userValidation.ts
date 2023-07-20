import { userLoginType } from "../../../interface/controller/user/userLoginController";
import { AppError } from "../../../utils/error";

export type User = {
    name?:string;
    email: string;
    password: string;
    phone: string;
    image: string;
    address: [];
    dob: Date;
    desease:[];
    isBlocked:boolean;
    isMailVarified: boolean;
    sex:string;
}

export const userSignup=(hashedPassword:Function)=>{
    return async (user:User):Promise<User>=>{
        if(!user.email || !user.name || !user.password ||
            /^\s*$/.test(user.email)|| 
            /^\s*$/.test(user.password)|| 
            /^\s*$/.test(user.name)){
            throw new AppError('All fields are requred',400)
        }
        if(user.password.length<=6){
            throw new AppError('Password must be at least 6 digits',400)
        }
        //hash the password
        const hashPsswrd=await hashedPassword(user.password)
        return {...user,password:hashPsswrd}
    }
}
export const userLogin=(passwordCompare:Function,createToken:Function)=>{
    return async (user:userLoginType,userData:userLoginType):Promise<string>=>{
        const {email,password}=user
        if(!email || !password || /^\s*$/.test(email)|| /^\s*$/.test(password)){
            throw new AppError('All fields are requred',400)
        }
        const isPasswordCorrect=await passwordCompare(password,userData.password)
        if(!isPasswordCorrect){
            throw new AppError('Incorrect password', 401)
        }
        const token:string=createToken(userData)
        return token
    }
} 