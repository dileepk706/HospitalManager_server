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
exports.addNewHealthProblem = void 0;
const error_1 = require("../../../../utils/error");
const addNewHealthProblem = (departmetRepository) => (departmentId, healthProblem) => __awaiter(void 0, void 0, void 0, function* () {
    //create New Health Concern
    const isDepartmentExist = yield departmetRepository.findDepartmentByHealthProblem(healthProblem);
    if (isDepartmentExist)
        throw new error_1.AppError("Health problem already exist in the list", 409);
    const newHealthProblem = yield departmetRepository.createNewHealthProblem(departmentId, healthProblem);
    return newHealthProblem;
});
exports.addNewHealthProblem = addNewHealthProblem;
