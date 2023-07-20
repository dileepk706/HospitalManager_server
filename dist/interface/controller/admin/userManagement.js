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
exports.searchUserController = exports.sortUserController = exports.blockOrUnblockUserController = exports.getAllUserController = void 0;
const user_1 = require("../../../infra/database/model/user/user");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const getAllUsers_1 = require("../../../app/useCase/admin/patients/getAllUsers");
const error_1 = require("../../../utils/error");
const blockUser_1 = require("../../../app/useCase/admin/patients/blockUser");
const searchSortFilter_1 = require("../../../app/useCase/admin/patients/searchSortFilter");
const db = user_1.userModel; //mogo db userModel
const userRepository = (0, userRepository_1.default)(db); // return mongodb methods related to user collection
//get all users
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, getAllUsers_1.getUsers)(userRepository)();
        if (!allUsers)
            throw new error_1.AppError('Somthing went wrong while fetch the users', 500);
        res.status(200).json({ users: allUsers });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getAllUserController = getAllUserController;
//block and unblock the user
const blockOrUnblockUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        const action = req.query.action;
        if (!userId || !action)
            throw new error_1.AppError('Not found', 404);
        //call the blockOneUser function with db operation and it will retur asyn func with two params for block the user
        const blockedPatiant = yield (0, blockUser_1.blockOneUser)(userRepository)(userId, action);
        if (blockedPatiant === null)
            throw new error_1.AppError('Somthing went wrong while fetch the users', 500);
        if (blockedPatiant === true) {
            res.status(200).json({ message: 'User blocked succesfully' });
            return;
        }
        else if (blockedPatiant === false) {
            res.status(200).json({ message: 'User unblocked succesfully' });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.blockOrUnblockUserController = blockOrUnblockUserController;
//sort the user data with diffriend conditions
const sortUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortCriteria = req.query;
        const sortedUser = yield (0, searchSortFilter_1.sortUserUsecase)(userRepository)(sortCriteria);
        res.status(200).json(sortedUser);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.sortUserController = sortUserController;
//sort the user data with diffriend conditions
const searchUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q;
        const searchResult = yield (0, searchSortFilter_1.searchUserUsecase)(userRepository)(searchQuery);
        res.status(200).json(searchResult);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.searchUserController = searchUserController;
