"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDepartmentData = void 0;
const error_1 = require("../../../utils/error");
const validateDepartmentData = (departmentName) => {
    if (!departmentName) {
        throw new error_1.AppError('department name is requred', 400);
    }
    return departmentName;
};
exports.validateDepartmentData = validateDepartmentData;
