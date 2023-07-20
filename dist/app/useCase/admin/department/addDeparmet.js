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
exports.addOneDepartment = void 0;
const deparment_1 = require("../../../../domain/entities/admin/deparment");
const error_1 = require("../../../../utils/error");
const addOneDepartment = (departmetRepository) => (departmentName) => __awaiter(void 0, void 0, void 0, function* () {
    const dapartmentNameValidate = (0, deparment_1.validateDepartmentData)(departmentName); //validate the depart ment name
    const isDepartmentExist = yield departmetRepository.findOneDepartmentByName(departmentName);
    if (isDepartmentExist)
        throw new error_1.AppError('The department is already exist', 409);
    const newDepartment = yield departmetRepository.createNewDepartment(dapartmentNameValidate);
    return newDepartment;
});
exports.addOneDepartment = addOneDepartment;
