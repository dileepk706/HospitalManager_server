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
exports.userLoginUserValidate = exports.userCreate = void 0;
const bcrypt = require('bcrypt');
const userValidation_1 = require("./userValidation");
const passwordHashing = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(password, 10);
    return hashedPassword;
});
const isPasswordCorrect = (plainTextPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const password = bcrypt.compare(plainTextPassword, hashedPassword);
    return password;
});
exports.userCreate = (0, userValidation_1.userSignup)(passwordHashing); // validate user data 
exports.userLoginUserValidate = (0, userValidation_1.userLogin)(isPasswordCorrect);
