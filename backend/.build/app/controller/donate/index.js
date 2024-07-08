"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateController = void 0;
const __1 = require("..");
const donate_1 = require("../../service/donate");
class DonateController extends __1.ControllerAncestral {
    constructor() {
        super(...arguments);
        this.donateService = new donate_1.DonateService();
    }
    async create(event) {
        const { body } = event;
        const data = JSON.parse(body)[0];
        try {
            const createdHelper = await this.donateService.create(data);
            return this.rsCreated("Doação criada com sucesso", createdHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async delete(event) {
        const { pathParameters } = event;
        const id = Number(pathParameters === null || pathParameters === void 0 ? void 0 : pathParameters.id);
        try {
            await this.donateService.deleteUnique(id);
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
            const foundHelper = await this.donateService.findUnique(id);
            return this.rsCreated("Doação encontrada com sucesso", foundHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findMany(event) {
        const { queryStringParameters } = event;
        const data = {
            help_request_id: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.help_request_id,
            user_id: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.user_id,
            amount: queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.amount,
        };
        try {
            const foundHelpers = await this.donateService.findMany(data);
            return this.rsCreated("Doações", foundHelpers);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
}
exports.DonateController = DonateController;
