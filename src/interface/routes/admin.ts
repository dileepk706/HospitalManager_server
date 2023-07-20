import express from "express"
import { addDepartmentController, addHealthProblemController, deleteDepartmentController, getAllDepartmentController } from "../controller/admin/departmentController"
import { blockOrUnblockUserController, getAllUserController, searchUserController, sortUserController, } from "../controller/admin/userManagement"
import { createDoctorController, getAllDoctorSearchFilterSortController } from "../controller/doctor/doctorManagement"

const adminRout=express.Router()

adminRout.post('/department',addDepartmentController)
adminRout.delete('/department/:departmentId',deleteDepartmentController)
adminRout.get('/all-department',getAllDepartmentController)
adminRout.post('/health-problem/:departmentId',addHealthProblemController)
adminRout.get('/patients',getAllUserController)
adminRout.patch('/block-unblock-patient',blockOrUnblockUserController)
adminRout.get('/sort-patient',sortUserController)
adminRout.get('/search-patient',searchUserController)
adminRout.post('/add-doctor',createDoctorController)
adminRout.get('/all-doctor',getAllDoctorSearchFilterSortController)
adminRout.patch('/block-unblock-patient',blockOrUnblockUserController)

export default adminRout