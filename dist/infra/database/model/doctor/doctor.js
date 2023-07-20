"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the doctor collection
const doctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isMailVarified: { type: Boolean, default: false },
    phone: { type: String, trim: true },
    image: { type: String, trim: true, default: null },
    address: { type: String, trim: true },
    dob: Date,
    isBlocked: { type: Boolean, default: false },
    sex: { type: String, enum: ['male', 'female'], trim: true },
    designation: { type: String, trim: true },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'department' },
    yearOfExperiance: { Number },
    biography: { type: String, trim: true },
    consultingFee: { type: Number },
}, {
    timestamps: { createdAt: true }
});
exports.doctorModel = mongoose_1.default.connection.model('doctor', doctorSchema);
