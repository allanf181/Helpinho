import { HelperController } from "../controller/helper";

const helperController = new HelperController();

export async function createHelper(event: any) {
  return await helperController.create(event);
}

export async function updateHelper(event: any) {
  return await helperController.update(event);
}

export async function deleteHelper(event: any) {
  return await helperController.delete(event);
}

export async function findUniqueHelper(event: any) {
  return await helperController.findUnique(event);
}

export async function findManyHelpers(event: any) {
  return await helperController.findMany(event);
}
