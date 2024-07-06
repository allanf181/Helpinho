"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperController = void 0;
const __1 = require("..");
const helper_1 = require("../../service/helper");
class HelperController extends __1.ControllerAncestral {
    constructor() {
        super(...arguments);
        this.helperService = new helper_1.HelperService();
    }
    async create(event) {
        const { body } = event;
        const data = JSON.parse(body)[0];
        try {
            const createdHelper = await this.helperService.create(data);
            return this.rsCreated("Helper criado com sucesso", createdHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async update(event) {
        const { body, pathParameters } = event;
        const { id } = pathParameters;
        const data = JSON.parse(body)[0];
        try {
            const updatedHelper = await this.helperService.update(data, Number(id));
            return this.rsSucess("Helper atualizado com sucesso", updatedHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async delete(event) {
        const { pathParameters } = event;
        const { id } = pathParameters;
        try {
            await this.helperService.deleteUnique(id);
            return this.rsNoContent("Helper deletado com sucesso");
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findUnique(event) {
        const { pathParameters } = event;
        const id = Number(pathParameters === null || pathParameters === void 0 ? void 0 : pathParameters.id);
        try {
            const foundHelper = await this.helperService.findUnique(id);
            return this.rsCreated("Helper encontrado com sucesso", foundHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findMany(event) {
        const { queryStringParameters } = event;
        const data = {
            requester: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.requester,
            title: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.title,
            description: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.description,
            image: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.image,
            goal: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.goal,
            donate_quantity: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.donate_quantity,
            parcial_amount: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.parcial_amount,
            update_date_time: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.update_date_time,
        };
        try {
            const foundHelpers = await this.helperService.findMany(data);
            return this.rsCreated("Helpers:", foundHelpers);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
}
exports.HelperController = HelperController;
