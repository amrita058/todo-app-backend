"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const env_config_1 = require("@/config/env.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //   const fe_token = req.headers.authorization;
    const token = authHeader ? authHeader : null;
    if (!token) {
        return res.status(401).json({ message: "Access denied. Token missing." });
    }
    jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(403).json("Unauthorized");
        res.locals.userData = decoded;
        next(); //can directly send user as argument to next
    });
};
exports.verifyJwt = verifyJwt;
