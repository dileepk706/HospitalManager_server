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
exports.userSignup = void 0;
const error_1 = require("../../../utils/error");
const userSignup = (hashedPassword) => {
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user.email || !user.name || !user.password) {
            throw new error_1.AppError('All fields are requred', 400);
        }
        if (user.password.length <= 6) {
            throw new error_1.AppError('Password must be at least 6 digits', 400);
        }
        //hash the password
        const hashPsswrd = yield hashedPassword(user.password);
        return Object.assign(Object.assign({}, user), { password: hashPsswrd });
    });
};
exports.userSignup = userSignup;