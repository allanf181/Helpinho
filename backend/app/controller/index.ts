import { HttpStatus } from "../types/enum";

export abstract class ControllerAncestral {
  private setResult(statusCode: HttpStatus, message: string, data?: any) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        message: message,
        data: data,
      }),
    };
  }

  protected rsCreated(message: string, data: any) {
    return this.setResult(HttpStatus.CREATED, message, data);
  }

  protected rsSucess(message: string, data: any) {
    return this.setResult(HttpStatus.SUCESS, message, data);
  }

  protected rsBadRequest(message: string, data: any) {
    return this.setResult(HttpStatus.BAD_REQUEST, message, data);
  }

  protected rsUnauthorized(message: string, data: any) {
    return this.setResult(HttpStatus.UNAUTHORIZED, message, data);
  }
  protected rsNoContent(message: string) {
    return this.setResult(HttpStatus.NO_CONTENT, message);
  }
}
