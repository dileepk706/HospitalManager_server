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
exports.addHealthProblem = exports.addDepartment = void 0;
const addDeparmet_1 = require("../../../app/useCase/admin/department/addDeparmet");
const department_1 = require("../../../infra/database/model/admin/department");
const departmentRepository_1 = __importDefault(require("../../../infra/repositories/department/departmentRepository"));
const addHealthProblem_1 = require("../../../app/useCase/admin/healthProblem/addHealthProblem");
const departmentRepository = (0, departmentRepository_1.default)(department_1.departmetModel);
const addDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentName = req.body.departmentName;
        const newDepartment = yield (0, addDeparmet_1.addOneDepartment)(departmentRepository)(departmentName);
        if (!newDepartment) {
            res.status(500).json({ message: 'Somthing went wrong' });
            return;
        }
        res.status(200).json({ message: 'Department added succesfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.addDepartment = addDepartment;
const addHealthProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.departmentId;
        const healthProblem = req.body.concern;
        // Check if healthProblem is empty or contains only whitespace
        if (!healthProblem || !departmentId || /^\s*$/.test(healthProblem)) {
            res.status(400).json({ message: 'health problem is requred' });
            return;
        }
        const newConcern = yield (0, addHealthProblem_1.addNewHealthProblem)(departmentRepository)(departmentId, healthProblem);
        if (!newConcern) {
            res.status(500).json({ message: 'Somthing went wrong' });
            return;
        }
        res.status(200).json({ message: 'Health Problem added succesfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.addHealthProblem = addHealthProblem;
