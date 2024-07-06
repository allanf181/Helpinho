import { ControllerAncestral } from "..";
import { DonateService } from "../../service/donate";

export class DonateController extends ControllerAncestral {
  donateService = new DonateService();
  async create(event: any) {
    const { body } = event;
    try {
      const createdHelper = await this.donateService.create(body);
      return this.rsCreated("Doação criada com sucesso", createdHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async delete(event: any) {
    const { body } = event;
    try {
      await this.donateService.deleteUnique(body);
      return this.rsNoContent("Helper deletado com sucesso");
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findUnique(event: any) {
    const { body } = event;
    try {
      const foundHelper = await this.donateService.findUnique(body.id);
      return this.rsCreated("Doação encontrada com sucesso", foundHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findMany(event: any) {
    const { body } = event;
    try {
      const foundHelpers = await this.donateService.findUnique(body.id);
      return this.rsCreated("Doações", foundHelpers);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }
}
