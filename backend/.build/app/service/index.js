"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceAncestral = void 0;
class ServiceAncestral {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }
    checkRequiredProp(data, propName) {
        console.log(data, propName, "CHEGOU NA REQUIRED PROPS");
        if (!data) {
            throw new Error(`Attribute ${propName} is required.`);
        }
    }
    createError() {
        throw new Error(`Não foi possível criar: ${this.serviceName}`);
    }
    updateError() {
        throw new Error(`Não foi possível atualizar: ${this.serviceName}`);
    }
    deleteError(id) {
        throw new Error(`Não foi possível deletar: ${this.serviceName} id: ${id}`);
    }
    findError(id) {
        throw new Error(`Não foi possível achar: ${this.serviceName} id: ${id}`);
    }
}
exports.ServiceAncestral = ServiceAncestral;
