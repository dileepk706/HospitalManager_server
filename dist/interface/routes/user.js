"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSignupController_1 = require("../controller/user/userSignupController");
const userLoginController_1 = require("../controller/user/userLoginController");
const departmentController_1 = require("../controller/user/departmentController");
const authMiddleware_1 = __importDefault(require("../../interface/middlewares/authMiddleware"));
const userRoute = express_1.default.Router();
userRoute.post('/signup', userSignupController_1.userSignup);
userRoute.post('/login', userLoginController_1.userLogin);
userRoute.get('/getalldepartments', authMiddleware_1.default, departmentController_1.getAllDepartments);
exports.default = userRoute;
