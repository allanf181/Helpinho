import { Donates, HelpRequest, PrismaClient } from "@prisma/client";
import { ServiceAncestral } from "..";

export class HelperService extends ServiceAncestral {
  constructor() {
    super("helper");
  }
  db = new PrismaClient();
  helperDB = this.db.helpRequest;
  validateHelper(data: HelpRequest, id?: number) {
    if (id) {
      this.checkRequiredProp(id, "id");
    } else {
      this.checkRequiredProp(data?.title, "title");
      this.checkRequiredProp(data?.description, "description");
      this.checkRequiredProp(data?.goal, "goal");
      this.checkRequiredProp(data?.image, "image");
      this.checkRequiredProp(data?.requester, "requester");
    }
  }

  async create(data: HelpRequest): Promise<HelpRequest | undefined> {
    try {
      await this.db.$connect();
      this.validateHelper(data, data.id);
      const result = await this.helperDB.create({ data });
      console.log("create helper", result);

      return result;
    } catch (err) {
      this.createError();
    } finally {
      this.db.$disconnect();
    }
  }

  async update(
    data: HelpRequest,
    id: number
  ): Promise<HelpRequest | undefined> {
    try {
      await this.db.$connect();
      this.validateHelper(data, id);
      const result = await this.helperDB.update({
        where: { id: data.id },
        data,
      });
      console.log("update helper", result);

      return result;
    } catch {
      this.updateError();
    } finally {
      this.db.$disconnect();
    }
  }

  async findUnique(id: number): Promise<HelpRequest> {
    await this.db.$connect();
    const result = await this.helperDB.findUnique({
      where: { id },
    });
    console.log(result);

    if (!result) {
      this.findError(id);
    }

    this.db.$disconnect();
    return result!;
  }

  async findMany(data: Partial<HelpRequest>): Promise<HelpRequest[]> {
    await this.db.$connect();
    const result = await this.helperDB.findMany({
      where: data,
    });
    console.log(result);

    await this.db.$disconnect();
    return result;
  }

  async deleteUnique(id: number): Promise<void> {
    try {
      await this.db.$connect();
      await this.helperDB.delete({
        where: { id },
      });
    } catch {
      this.deleteError(id);
    } finally {
      this.db.$disconnect();
    }
  }

  async incrementOneDonation(donate: Donates, db: PrismaClient) {
    try {
      const helper = await db.helpRequest.findUnique({
        where: { id: donate.help_request_id },
      });
      if (!helper) this.updateError();

      const helperToUpdate = { ...helper };
      helperToUpdate.parcial_amount =
        (helper!?.parcial_amount || 0) + donate.amount;
      helperToUpdate.donate_quantity = (helper!?.donate_quantity || 0) + 1;

      await db.helpRequest.update({
        where: { id: helperToUpdate.id },
        data: helperToUpdate,
      });
    } catch {
      this.updateError();
    }
  }

  async decrementOneDonation(donate: Donates, db: PrismaClient) {
    try {
      const helper = await db.helpRequest.findUnique({
        where: { id: donate.help_request_id },
      });
      if (!helper) this.updateError();

      const helperToUpdate = { ...helper };
      helperToUpdate.parcial_amount = helper?.parcial_amount! - donate.amount;
      helperToUpdate.donate_quantity = helper?.donate_quantity! - 1;

      await db.helpRequest.update({
        where: { id: helperToUpdate.id },
        data: helperToUpdate,
      });
    } catch {
      this.updateError();
    }
  }
}
