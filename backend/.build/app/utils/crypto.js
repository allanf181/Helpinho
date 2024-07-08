"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptText = encryptText;
const crypto_1 = require("crypto");
function encryptText(text) {
    console.log(text, "SENHA AQUI PORRA");
    return (0, crypto_1.createHash)("sha256").update(text).digest("hex");
}
