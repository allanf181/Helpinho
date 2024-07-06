import { ControllerAncestral } from "..";
import { DonateService } from "../../service/donate";

export class DonateController extends ControllerAncestral {
  donateService = new DonateService();
  async create(event: any) {
    const { body } = event;
    const data = JSON.parse(body)[0];
    try {
      const createdHelper = await this.donateService.create(data);
      return this.rsCreated("Doação criada com sucesso", createdHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async delete(event: any) {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);
    try {
      await this.donateService.deleteUnique(id);
      return this.rsNoContent("Helper deletado com sucesso");
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findUnique(event: any) {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);
    try {
      const foundHelper = await this.donateService.findUnique(id);
      return this.rsCreated("Doação encontrada com sucesso", foundHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findMany(event: any) {
    const { queryStringParameters } = event;
    const data = {
      help_request_id: queryStringParameters?.help_request_id,
      user_id: queryStringParameters?.user_id,
      amount: queryStringParameters?.amount,
    };
    try {
      const foundHelpers = await this.donateService.findMany(data);
      return this.rsCreated("Doações", foundHelpers);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }
}
