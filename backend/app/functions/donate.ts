import { DonateController } from "../controller/donate";

const donateController = new DonateController();

export async function createDonate(event: any) {
  return await donateController.create(event);
}

export async function deleteDonate(event: any) {
  return await donateController.delete(event);
}

export async function findUniqueDonate(event: any) {
  return await donateController.findUnique(event);
}

export async function findManyDonates(event: any) {
  return await donateController.findMany(event);
}
