"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const client_1 = require("@prisma/client");
const __1 = require("..");
class HelperService extends __1.ServiceAncestral {
    constructor() {
        super("helper");
        this.db = new client_1.PrismaClient();
        this.helperDB = this.db.helpRequest;
    }
    validateHelper(data, id) {
        if (id) {
            this.checkRequiredProp(id, "id");
        }
        else {
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.title, "title");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.description, "description");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.goal, "goal");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.image, "image");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.requester, "requester");
        }
    }
    async create(data) {
        try {
            await this.db.$connect();
            this.validateHelper(data, data.id);
            const result = await this.helperDB.create({ data });
            console.log("create helper", result);
            return result;
        }
        catch (err) {
            this.createError();
        }
        finally {
            this.db.$disconnect();
        }
    }
    async update(data, id) {
        try {
            await this.db.$connect();
            this.validateHelper(data, id);
            const result = await this.helperDB.update({
                where: { id: data.id },
                data,
            });
            console.log("update helper", result);
            return result;
        }
        catch (_a) {
            this.updateError();
        }
        finally {
            this.db.$disconnect();
        }
    }
    async findUnique(id) {
        await this.db.$connect();
        const result = await this.helperDB.findUnique({
            where: { id },
        });
        console.log(result);
        if (!result) {
            this.findError(id);
        }
        this.db.$disconnect();
        return result;
    }
    async findMany(data) {
        await this.db.$connect();
        const result = await this.helperDB.findMany({
            where: data,
        });
        console.log(result);
        await this.db.$disconnect();
        return result;
    }
    async deleteUnique(id) {
        try {
            await this.db.$connect();
            await this.helperDB.delete({
                where: { id },
            });
        }
        catch (_a) {
            this.deleteError(id);
        }
        finally {
            this.db.$disconnect();
        }
    }
    async incrementOneDonation(donate, db) {
        try {
            const helper = await db.helpRequest.findUnique({
                where: { id: donate.help_request_id },
            });
            if (!helper)
                this.updateError();
            const helperToUpdate = { ...helper };
            helperToUpdate.parcial_amount =
                ((helper === null || helper === void 0 ? void 0 : helper.parcial_amount) || 0) + donate.amount;
            helperToUpdate.donate_quantity = ((helper === null || helper === void 0 ? void 0 : helper.donate_quantity) || 0) + 1;
            await db.helpRequest.update({
                where: { id: helperToUpdate.id },
                data: helperToUpdate,
            });
        }
        catch (_a) {
            this.updateError();
        }
    }
    async decrementOneDonation(donate, db) {
        try {
            const helper = await db.helpRequest.findUnique({
                where: { id: donate.help_request_id },
            });
            if (!helper)
                this.updateError();
            const helperToUpdate = { ...helper };
            helperToUpdate.parcial_amount = (helper === null || helper === void 0 ? void 0 : helper.parcial_amount) - donate.amount;
            helperToUpdate.donate_quantity = (helper === null || helper === void 0 ? void 0 : helper.donate_quantity) - 1;
            await db.helpRequest.update({
                where: { id: helperToUpdate.id },
                data: helperToUpdate,
            });
        }
        catch (_a) {
            this.updateError();
        }
    }
}
exports.HelperService = HelperService;
