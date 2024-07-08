"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.findUniqueUser = findUniqueUser;
exports.findManyUsers = findManyUsers;
const user_1 = require("../controller/user");
const userController = new user_1.UserController();
async function createUser(event) {
    return await userController.create(event);
}
async function updateUser(event) {
    return await userController.update(event);
}
async function deleteUser(event) {
    return await userController.delete(event);
}
async function findUniqueUser(event) {
    return await userController.findUnique(event);
}
async function findManyUsers(event) {
    return await userController.findMany(event);
}
