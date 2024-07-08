import { ControllerAncestral } from "..";
import { HelperService } from "../../service/helper";

export class HelperController extends ControllerAncestral {
  helperService = new HelperService();
  async create(event: any) {
    const { body } = event;
    const data = JSON.parse(body)[0];
    try {
      const createdHelper = await this.helperService.create(data);
      return this.rsCreated("Helper criado com sucesso", createdHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async update(event: any) {
    const { body, pathParameters } = event;
    const { id } = pathParameters;
    const data = JSON.parse(body)[0];
    try {
      const updatedHelper = await this.helperService.update(data, Number(id));
      return this.rsSucess("Helper atualizado com sucesso", updatedHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async delete(event: any) {
    const { pathParameters } = event;
    const { id } = pathParameters;
    try {
      await this.helperService.deleteUnique(id);
      return this.rsNoContent("Helper deletado com sucesso");
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findUnique(event: any) {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);
    try {
      const foundHelper = await this.helperService.findUnique(id);
      return this.rsCreated("Helper encontrado com sucesso", foundHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findMany(event: any) {
    const { queryStringParameters } = event;
    const data = {
      requester: queryStringParameters?.requester,
      title: queryStringParameters?.title,
      description: queryStringParameters?.description,
      image: queryStringParameters?.image,
      goal: queryStringParameters?.goal,
      donate_quantity: queryStringParameters?.donate_quantity,
      parcial_amount: queryStringParameters?.parcial_amount,
      update_date_time: queryStringParameters?.update_date_time,
    };
    try {
      const foundHelpers = await this.helperService.findMany(data);
      return this.rsCreated("Helpers:", foundHelpers);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }
}
