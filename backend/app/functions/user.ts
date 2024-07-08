import { UserController } from "../controller/user";

const userController = new UserController();

export async function createUser(event: any) {
  return await userController.create(event);
}

export async function updateUser(event: any) {
  return await userController.update(event);
}

export async function deleteUser(event: any) {
  return await userController.delete(event);
}

export async function findUniqueUser(event: any) {
  return await userController.findUnique(event);
}

export async function findManyUsers(event: any) {
  return await userController.findMany(event);
}
