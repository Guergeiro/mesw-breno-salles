import { RpcException } from "@nestjs/microservices";

export class ResultException extends RpcException {
  private readonly resultId: string;

  public constructor(error: string | object, resultId: string) {
    super(error);
    this.resultId = resultId;
  }

  public getResultId() {
    return this.resultId;
  }
}
