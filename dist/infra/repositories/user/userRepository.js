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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../../utils/error");
const userRepositoryImpl = (UserModel) => {
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        let newUser = yield UserModel.create(user);
        return newUser;
    });
    const findOneUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ email });
        return user;
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield UserModel.find({}, { password: 0 });
        if (!allUsers)
            throw new error_1.AppError('Somthing went wrong when block the user', 500);
        return allUsers;
    });
    const updateIsBlock = (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
        //change the isBlocked bool value regards the action
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        //update the isBlocked field
        const blockedUser = yield UserModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
        if (!blockedUser)
            throw new error_1.AppError('Somthing went wrong when block the user', 500);
        return isBlocked;
    });
    //sorting the user data with diff critirea 
    const sortUser = (sortCriteria) => __awaiter(void 0, void 0, void 0, function* () {
        const sortedUsers = yield UserModel.find().sort(sortCriteria);
        return sortedUsers;
    });
    //search the user data 
    const searchUser = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        const searchResult = yield UserModel.find({ name: { $regex: searchQuery, $options: 'i' } });
        return searchResult;
    });
    return { createUser, findOneUserByEmail, getAllUsers, updateIsBlock, sortUser, searchUser };
};
exports.default = userRepositoryImpl;
