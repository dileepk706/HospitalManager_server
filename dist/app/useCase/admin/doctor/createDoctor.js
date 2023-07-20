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
exports.createDoctorUsecase = void 0;
const doctorValidateHelper_1 = require("../../../../domain/entities/doctor/doctorValidateHelper");
const error_1 = require("../../../../utils/error");
const createDoctorUsecase = (doctorRepository, departmetRepository) => (doctorData) => __awaiter(void 0, void 0, void 0, function* () {
    yield departmetRepository.findOneDepartmentById(doctorData.department); //check if the department is exist or not
    const isDOctorExist = yield doctorRepository.findDoctorByEmail(doctorData.email);
    if (isDOctorExist)
        throw new error_1.AppError('Doctor is already exist', 409);
    const validateDoctor = yield (0, doctorValidateHelper_1.doctorValidateHelper)(doctorData);
    const newDoctor = yield doctorRepository.createDoctor(validateDoctor);
    return newDoctor;
});
exports.createDoctorUsecase = createDoctorUsecase;
