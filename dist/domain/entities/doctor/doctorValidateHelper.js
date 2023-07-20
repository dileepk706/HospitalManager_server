"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorValidateHelper = void 0;
const doctor_1 = require("./doctor");
const userValidationHelper_1 = require("../user/userValidationHelper"); //this method will hash the password
const nanoid_1 = require("nanoid");
const generateRandomPassword = (length) => {
    return (0, nanoid_1.nanoid)(length);
};
exports.doctorValidateHelper = (0, doctor_1.validateDoctor)(userValidationHelper_1.passwordHashing, generateRandomPassword);
