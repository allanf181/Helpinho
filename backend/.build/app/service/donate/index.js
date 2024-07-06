"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateService = void 0;
const client_1 = require("@prisma/client");
const helper_1 = require("../helper");
const __1 = require("..");
class DonateService extends __1.ServiceAncestral {
    constructor() {
        super("donate");
        this.db = new client_1.PrismaClient();
        this.donateDB = this.db.donates;
        this.helperService = new helper_1.HelperService();
    }
    validateDonate(data, id) {
        if (id) {
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.id, "id");
        }
        else {
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.user_id, "user_id");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.help_request_id, "help_request_id");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.amount, "amount");
        }
    }
    async create(data) {
        try {
            await this.db.$connect();
            this.validateDonate(data, data.id);
            const result = await this.donateDB.create({ data });
            await this.helperService.incrementOneDonation(data, this.db);
            console.log("create donate", result);
            return result;
        }
        catch (err) {
            this.createError();
        }
        finally {
            this.db.$disconnect();
        }
    }
    async findUnique(id) {
        await this.db.$connect();
        const result = await this.donateDB.findUnique({
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
        const result = await this.donateDB.findMany({
            where: data,
        });
        console.log(result);
        await this.db.$disconnect();
        return result;
    }
    async deleteUnique(id) {
        try {
            await this.db.$connect();
            const donate = await this.donateDB.delete({
                where: { id },
            });
            await this.helperService.decrementOneDonation(donate, this.db);
        }
        catch (_a) {
            this.deleteError(id);
        }
        finally {
            this.db.$disconnect();
        }
    }
}
exports.DonateService = DonateService;
