"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = void 0;
const user_1 = require("../../../infra/database/model/user/user");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const userSignup_1 = require("../../../app/useCase/user/userSignup");
const db = user_1.userModel; //Instantiate MongoDB connection 
const userRepository = (0, userRepository_1.default)(db);
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        //userRepository contains all dbOperations of user collection
        //signupSuer accept the userRepository as parameter and  return another function to create a new User
        const createdUser = yield (0, userSignup_1.signupSuer)(userRepository)(user);
        if (!createdUser) {
            res.status(500).json({ message: 'Somthing went wrong' });
        }
        res.status(200).json({ message: 'User created succussfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.userSignup = userSignup;
