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
const departmentRepositoryIMPL = (DepartmentModel) => {
    // Create a new department document
    const createNewDepartment = (departmentName) => __awaiter(void 0, void 0, void 0, function* () {
        const newDeparment = new DepartmentModel({
            departmentName: departmentName,
            healthProblems: []
        });
        const createdDepartment = yield newDeparment.save();
        return createdDepartment;
    });
    //find department by name
    const findOneDepartmentByName = (departmentName) => __awaiter(void 0, void 0, void 0, function* () {
        const departmentExist = yield DepartmentModel.findOne({ departmentName });
        return departmentExist;
    });
    //find department by health
    const findDepartmentByHealthProblem = (healthProblem) => __awaiter(void 0, void 0, void 0, function* () {
        const department = yield DepartmentModel.findOne({
            healthProblems: { $regex: new RegExp(healthProblem, 'i') },
        });
        return department;
    });
    //create new health problem under the deoartment
    const createNewHealthProblem = (departmentId, healthProblem) => __awaiter(void 0, void 0, void 0, function* () {
        const deparment = yield DepartmentModel.findById({ _id: departmentId });
        if (!deparment)
            throw new error_1.AppError('Department not found', 404);
        deparment.healthProblems.push(healthProblem);
        yield deparment.save();
        return deparment;
    });
    return { createNewDepartment, findOneDepartmentByName, createNewHealthProblem, findDepartmentByHealthProblem };
};
exports.default = departmentRepositoryIMPL;
