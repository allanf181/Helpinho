"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = require("../../utils/crypto");
const __1 = require("..");
class UserService extends __1.ServiceAncestral {
    constructor() {
        super("user");
        this.db = new client_1.PrismaClient();
        this.userDb = this.db.user;
        this.select = {
            id: true,
            name: true,
            email: true,
            telephone: true,
            update_date_time: true,
        };
    }
    validateUser(data, id) {
        if (id) {
            this.checkRequiredProp(id, "id");
        }
        else {
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.name, "name");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.email, "email");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.secret, "secret");
            this.checkRequiredProp(data === null || data === void 0 ? void 0 : data.telephone, "telephone");
        }
    }
    async create(data) {
        try {
            this.validateUser(data, data.id);
            data.secret = (0, crypto_1.encryptText)(data.secret);
            return await this.userDb.create({ data, select: this.select });
        }
        catch (err) {
            console.log(err);
            this.createError();
        }
        finally {
            this.db.$disconnect();
        }
    }
    async update(data, id) {
        try {
            this.validateUser(data, id);
            if (data.secret) {
                data.secret = (0, crypto_1.encryptText)(data.secret);
            }
            const result = await this.userDb.update({
                where: { id },
                data,
                select: this.select,
            });
            console.log(result);
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
        const result = await this.userDb.findUnique({
            where: { id },
            select: this.select,
        });
        console.log(result);
        if (!result) {
            this.findError(id);
        }
        this.db.$disconnect();
        return result;
    }
    async findMany(data) {
        const result = await this.userDb.findMany({
            where: data,
            select: this.select,
        });
        console.log(result);
        return result;
    }
    async deleteUnique(id) {
        try {
            await this.userDb.delete({
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
}
exports.UserService = UserService;
