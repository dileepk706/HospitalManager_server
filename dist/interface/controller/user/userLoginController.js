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
exports.userLogin = void 0;
const user_1 = require("../../../infra/database/model/user/user");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const userLogin_1 = require("../../../app/useCase/user/userLogin");
const db = user_1.userModel; //Instantiate MongoDB connection 
const userRepository = (0, userRepository_1.default)(db);
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        //userRepository contains all dbOperations of user collection
        //login accept the userRepository as parameter and  return another function to login the user
        const userToken = yield (0, userLogin_1.loginUser)(userRepository)(user);
        console.log(userToken);
        res.status(200).json({ message: userToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.userLogin = userLogin;
