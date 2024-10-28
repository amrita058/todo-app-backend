"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
console.log("process", process.env.PORT);
exports.env = {
    PORT: process.env.PORT,
    URI: process.env.URI,
    SECRET_KEY: process.env.SECRET_KEY,
};
