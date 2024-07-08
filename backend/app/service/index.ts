export abstract class ServiceAncestral {
  serviceName;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
  protected checkRequiredProp(data: any, propName: string) {
    console.log(data, propName, "CHEGOU NA REQUIRED PROPS");
    if (!data) {
      throw new Error(`Attribute ${propName} is required.`);
    }
  }

  protected createError() {
    throw new Error(`Não foi possível criar: ${this.serviceName}`);
  }

  protected updateError() {
    throw new Error(`Não foi possível atualizar: ${this.serviceName}`);
  }

  protected deleteError(id: number) {
    throw new Error(`Não foi possível deletar: ${this.serviceName} id: ${id}`);
  }

  protected findError(id: number) {
    throw new Error(`Não foi possível achar: ${this.serviceName} id: ${id}`);
  }
}
