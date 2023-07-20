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
exports.validateDoctor = void 0;
const error_1 = require("../../../utils/error");
const validateDoctor = (passwordHashing, generateRandomPassword) => {
    return (doctor) => __awaiter(void 0, void 0, void 0, function* () {
        if (!doctor.name)
            throw new error_1.AppError('name is required', 400);
        if (!doctor.email)
            throw new error_1.AppError('email is required', 400);
        if (!doctor.phone)
            throw new error_1.AppError('phone is required', 400);
        if (!doctor.sex)
            throw new error_1.AppError('sex is required', 400);
        if (!doctor.yearOfExperiance)
            throw new error_1.AppError('Experiance  is required', 400);
        if (!doctor.department)
            throw new error_1.AppError('department  is required', 400);
        if (!doctor.designation)
            throw new error_1.AppError('designation  is required', 400);
        if (!doctor.consultingFee)
            throw new error_1.AppError('consulting fee  is required', 400);
        const tempPassword = generateRandomPassword(2);
        const password = yield passwordHashing(tempPassword);
        const validatedDoctorData = Object.assign(Object.assign({}, doctor), { password });
        return validatedDoctorData;
    });
};
exports.validateDoctor = validateDoctor;
