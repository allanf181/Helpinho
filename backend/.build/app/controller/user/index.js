"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const __1 = require("..");
const user_1 = require("../../service/user");
class UserController extends __1.ControllerAncestral {
    constructor() {
        super(...arguments);
        this.userService = new user_1.UserService();
    }
    async create(event) {
        const { body } = event;
        const data = JSON.parse(body)[0];
        try {
            const createdUser = await this.userService.create(data);
            return this.rsCreated("Usuário adicionado com sucesso", createdUser);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async update(event) {
        const { body, pathParameters } = event;
        const id = Number(pathParameters === null || pathParameters === void 0 ? void 0 : pathParameters.id);
        const data = JSON.parse(body)[0];
        try {
            const updatedUser = await this.userService.update(data, id);
            return this.rsSucess("Usuário atualizado com sucesso", updatedUser);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async delete(event) {
        const { pathParameters } = event;
        const id = Number(pathParameters === null || pathParameters === void 0 ? void 0 : pathParameters.id);
        try {
            await this.userService.deleteUnique(id);
            return this.rsNoContent("Usuário deletado com sucesso");
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findUnique(event) {
        const { pathParameters } = event;
        const id = Number(pathParameters === null || pathParameters === void 0 ? void 0 : pathParameters.id);
        try {
            const foundHelper = await this.userService.findUnique(id);
            return this.rsCreated("Usuário encontrado com sucesso", foundHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findMany(event) {
        const { queryStringParameters } = event;
        const data = {
            name: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.name,
            telephone: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.telephone,
            email: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.email,
        };
        try {
            const foundHelpers = await this.userService.findMany(data);
            return this.rsCreated("Usuários:", foundHelpers);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
}
exports.UserController = UserController;
