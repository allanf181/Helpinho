import { PrismaClient, User } from "@prisma/client";
import { encryptText } from "../../utils/crypto";
import { ServiceAncestral } from "..";

export class UserService extends ServiceAncestral {
  constructor() {
    super("user");
  }
  db = new PrismaClient();
  userDb = this.db.user;
  select = {
    id: true,
    name: true,
    email: true,
    telephone: true,
    update_date_time: true,
  };

  validateUser(data: User, id?: number) {
    if (id) {
      this.checkRequiredProp(id, "id");
    } else {
      this.checkRequiredProp(data?.name, "name");
      this.checkRequiredProp(data?.email, "email");
      this.checkRequiredProp(data?.secret, "secret");
      this.checkRequiredProp(data?.telephone, "telephone");
    }
  }

  async create(data: User): Promise<Omit<User, "secret"> | undefined> {
    try {
      this.validateUser(data, data.id);
      data.secret = encryptText(data.secret);
      return await this.userDb.create({ data, select: this.select });
    } catch (err) {
      console.log(err);
      this.createError();
    } finally {
      this.db.$disconnect();
    }
  }

  async update(
    data: User,
    id: number
  ): Promise<Omit<User, "secret"> | undefined> {
    try {
      this.validateUser(data, id);
      if (data.secret) {
        data.secret = encryptText(data.secret);
      }

      const result = await this.userDb.update({
        where: { id },
        data,
        select: this.select,
      });
      console.log(result);

      return result;
    } catch {
      this.updateError();
    } finally {
      this.db.$disconnect();
    }
  }

  async findUnique(id: number): Promise<Omit<User, "secret">> {
    const result = await this.userDb.findUnique({
      where: { id },
      select: this.select,
    });
    console.log(result);

    if (!result) {
      this.findError(id);
    }

    this.db.$disconnect();
    return result!;
  }

  async findMany(data: Partial<User>): Promise<Omit<User, "secret">[]> {
    const result = await this.userDb.findMany({
      where: data,
      select: this.select,
    });
    console.log(result);
    return result;
  }

  async deleteUnique(id: number): Promise<void> {
    try {
      await this.userDb.delete({
        where: { id },
      });
    } catch {
      this.deleteError(id);
    } finally {
      this.db.$disconnect();
    }
  }
}
