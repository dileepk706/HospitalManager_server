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
exports.createDoctorController = void 0;
const createDoctor_1 = require("../../../app/useCase/admin/doctor/createDoctor");
const doctorRepository_1 = __importDefault(require("../../../infra/repositories/doctor/doctorRepository"));
const doctor_1 = require("../../../infra/database/model/doctor/doctor");
const departmentRepository_1 = __importDefault(require("../../../infra/repositories/department/departmentRepository"));
const department_1 = require("../../../infra/database/model/admin/department");
const departmentRepository = (0, departmentRepository_1.default)(department_1.departmetModel); //mongodb query methods of departmet
const doctorRepository = (0, doctorRepository_1.default)(doctor_1.doctorModel); //mongodb query methods of doctor
const createDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorData = req.body;
        const newDoctor = yield (0, createDoctor_1.createDoctorUsecase)(doctorRepository, departmentRepository)(doctorData);
        res.status(200).send(newDoctor);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.createDoctorController = createDoctorController;
