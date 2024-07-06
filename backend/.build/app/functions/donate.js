"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonate = createDonate;
exports.deleteDonate = deleteDonate;
exports.findUniqueDonate = findUniqueDonate;
exports.findManyDonates = findManyDonates;
const donate_1 = require("../controller/donate");
const donateController = new donate_1.DonateController();
async function createDonate(event) {
    return await donateController.create(event);
}
async function deleteDonate(event) {
    return await donateController.delete(event);
}
async function findUniqueDonate(event) {
    return await donateController.findUnique(event);
}
async function findManyDonates(event) {
    return await donateController.findMany(event);
}
