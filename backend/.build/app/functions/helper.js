"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelper = createHelper;
exports.updateHelper = updateHelper;
exports.deleteHelper = deleteHelper;
exports.findUniqueHelper = findUniqueHelper;
exports.findManyHelpers = findManyHelpers;
const helper_1 = require("../controller/helper");
const helperController = new helper_1.HelperController();
async function createHelper(event) {
    return await helperController.create(event);
}
async function updateHelper(event) {
    return await helperController.update(event);
}
async function deleteHelper(event) {
    return await helperController.delete(event);
}
async function findUniqueHelper(event) {
    return await helperController.findUnique(event);
}
async function findManyHelpers(event) {
    return await helperController.findMany(event);
}
