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
exports.loginUser = void 0;
const { MongoClient } = require("mongodb");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const user_model_1 = __importDefault(require("../model/user.model"));
//connection to database
// const client = new MongoClient(uri);
// const database = client.db("webdevelopment");
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = database.collection("users");
        const data = yield user_model_1.default.findOne({ userName: user.userName });
        console.log("At repo", data);
        return data;
    }
    catch (e) {
        console.log("catch", e);
        throw e;
    }
});
exports.loginUser = loginUser;
