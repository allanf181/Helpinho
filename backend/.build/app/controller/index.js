"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAncestral = void 0;
const enum_1 = require("../types/enum");
class ControllerAncestral {
    setResult(statusCode, message, data) {
        return {
            statusCode: statusCode,
            body: JSON.stringify({
                message: message,
                data: data,
            }),
        };
    }
    rsCreated(message, data) {
        return this.setResult(enum_1.HttpStatus.CREATED, message, data);
    }
    rsSucess(message, data) {
        return this.setResult(enum_1.HttpStatus.SUCESS, message, data);
    }
    rsBadRequest(message, data) {
        return this.setResult(enum_1.HttpStatus.BAD_REQUEST, message, data);
    }
    rsUnauthorized(message, data) {
        return this.setResult(enum_1.HttpStatus.UNAUTHORIZED, message, data);
    }
    rsNoContent(message) {
        return this.setResult(enum_1.HttpStatus.NO_CONTENT, message);
    }
}
exports.ControllerAncestral = ControllerAncestral;
