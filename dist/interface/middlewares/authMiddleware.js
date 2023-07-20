"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
exports.default = UserAuthenticateToken;
