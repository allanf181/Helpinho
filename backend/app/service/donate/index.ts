import { Donates, PrismaClient } from "@prisma/client";
import { HelperService } from "../helper";
import { ServiceAncestral } from "..";

export class DonateService extends ServiceAncestral {
  constructor() {
    super("donate");
  }
  db = new PrismaClient();
  donateDB = this.db.donates;
  helperService = new HelperService();
  validateDonate(data: Donates, id?: number) {
    if (id) {
      this.checkRequiredProp(data?.id, "id");
    } else {
      this.checkRequiredProp(data?.user_id, "user_id");
      this.checkRequiredProp(data?.help_request_id, "help_request_id");
      this.checkRequiredProp(data?.amount, "amount");
    }
  }

  async create(data: Donates): Promise<Donates | undefined> {
    try {
      await this.db.$connect();

      this.validateDonate(data, data.id);
      const result = await this.donateDB.create({ data });
      await this.helperService.incrementOneDonation(data, this.db);
      console.log("create donate", result);

      return result;
    } catch (err) {
      this.createError();
    } finally {
      this.db.$disconnect();
    }
  }

  async findUnique(id: number): Promise<Donates> {
    await this.db.$connect();
    const result = await this.donateDB.findUnique({
      where: { id },
    });
    console.log(result);

    if (!result) {
      this.findError(id);
    }

    this.db.$disconnect();
    return result!;
  }

  async findMany(data: Partial<Donates>): Promise<Donates[]> {
    await this.db.$connect();
    const result = await this.donateDB.findMany({
      where: data,
    });
    console.log(result);
    await this.db.$disconnect();
    return result;
  }

  async deleteUnique(id: number): Promise<void> {
    try {
      await this.db.$connect();
      const donate = await this.donateDB.delete({
        where: { id },
      });
      await this.helperService.decrementOneDonation(donate, this.db);
    } catch {
      this.deleteError(id);
    } finally {
      this.db.$disconnect();
    }
  }
}
