import { ControllerAncestral } from "..";
import { UserService } from "../../service/user";

export class UserController extends ControllerAncestral {
  userService = new UserService();
  async create(event: any) {
    const { body } = event;
    const data = JSON.parse(body)[0];
    try {
      const createdUser = await this.userService.create(data);
      return this.rsCreated("Usuário adicionado com sucesso", createdUser);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async update(event: any) {
    const { body, pathParameters } = event;
    const id = Number(pathParameters?.id);
    const data = JSON.parse(body)[0];
    try {
      const updatedUser = await this.userService.update(data, id);
      return this.rsSucess("Usuário atualizado com sucesso", updatedUser);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async delete(event: any) {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);
    try {
      await this.userService.deleteUnique(id);
      return this.rsNoContent("Usuário deletado com sucesso");
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findUnique(event: any) {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);
    try {
      const foundHelper = await this.userService.findUnique(id);
      return this.rsCreated("Usuário encontrado com sucesso", foundHelper);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }

  async findMany(event: any) {
    const { queryStringParameters } = event;
    const data = {
      name: queryStringParameters?.name,
      telephone: queryStringParameters?.telephone,
      email: queryStringParameters?.email,
    };
    try {
      const foundHelpers = await this.userService.findMany(data);
      return this.rsCreated("Usuários:", foundHelpers);
    } catch (error: any) {
      return this.rsBadRequest(error.message, error);
    }
  }
}
