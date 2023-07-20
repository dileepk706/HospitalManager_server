"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../controller/admin/departmentController");
const userManagement_1 = require("../controller/admin/userManagement");
const doctorManagement_1 = require("../controller/admin/doctorManagement");
const adminRout = express_1.default.Router();
adminRout.post('/department', departmentController_1.addDepartment);
adminRout.post('/health-problem/:departmentId', departmentController_1.addHealthProblem);
adminRout.get('/patients', userManagement_1.getAllUserController);
adminRout.patch('/block-unblock-patient', userManagement_1.blockOrUnblockUserController);
adminRout.patch('/sort-patient', userManagement_1.sortUserController);
adminRout.get('/search-patient', userManagement_1.searchUserController);
adminRout.post('/add-doctor', doctorManagement_1.createDoctorController);
exports.default = adminRout;
