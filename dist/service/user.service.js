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
exports.loginUser = void 0;
const UserRepository = __importStar(require("../repository/user.repository"));
// import { IUser, IItem } from "../Repository/User.types";
// const bcrypt = require("bcrypt");
//business logic
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "kishimotosekai@gmail.com",
//     pass: "onxwqrvgwiwbebwq",
//   },
// });
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield UserRepository.loginUser(user);
        //   console.log("At service", data);
        //   if (data && (await bcrypt.compare(user.password, data.password))) {
        //     const user = { userName: data.userName, role: data.role };
        //     const token = jwt.sign(data, process.env.SECRET_KEY);
        //     console.log("this is token", token, { userName: data.userName });
        //     console.log(JSON.stringify(data));
        //     return { token };
        //   } else {
        //     const error = new Error("User does not exist");
        //     error.name = "401";
        //     throw error;
        //   }
    }
    catch (e) {
        console.log("service", e);
        throw e;
    }
    return "hello";
});
exports.loginUser = loginUser;
