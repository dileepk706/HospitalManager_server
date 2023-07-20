
import express,{Request,Response} from "express"
import { userSignup } from "../controller/user/userSignupController";
import { userLogin } from "../controller/user/userLoginController";
import { getAllDepartments, getHealthProblems_Controller } from "../controller/user/departmentController";
import UserAuthenticateToken from "../../interface/middlewares/authMiddleware";

const userRoute=express.Router()

userRoute.post('/signup',userSignup)
userRoute.post('/login',userLogin)
userRoute.get('/getalldepartments',UserAuthenticateToken,getAllDepartments)
userRoute.get('/healthProblems',getHealthProblems_Controller)


export default userRoute