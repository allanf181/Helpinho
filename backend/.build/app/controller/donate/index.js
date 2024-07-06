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
        try {
            const createdHelper = await this.donateService.create(body);
            return this.rsCreated("Doação criada com sucesso", createdHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async delete(event) {
        const { body } = event;
        try {
            await this.donateService.deleteUnique(body);
            return this.rsNoContent("Helper deletado com sucesso");
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findUnique(event) {
        const { body } = event;
        try {
            const foundHelper = await this.donateService.findUnique(body.id);
            return this.rsCreated("Doação encontrada com sucesso", foundHelper);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
    async findMany(event) {
        const { body } = event;
        try {
            const foundHelpers = await this.donateService.findUnique(body.id);
            return this.rsCreated("Doações", foundHelpers);
        }
        catch (error) {
            return this.rsBadRequest(error.message, error);
        }
    }
}
exports.DonateController = DonateController;
