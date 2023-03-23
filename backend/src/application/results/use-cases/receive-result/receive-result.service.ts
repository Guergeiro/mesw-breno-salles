import {
  Result,
  ResultData,
  Service,
  Status,
} from "@domain/entities/result.entity";
import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { map, Subject } from "rxjs";
import { ToolControllerOutput } from "shared-tools";

type SuccessStatus = Extract<ToolControllerOutput, { status: "success" }>;
type FailedStatus = Extract<ToolControllerOutput, { status: "failed" }>;

@Injectable()
export class ReceiveResultService {
  private readonly orm: MikroORM;
  private readonly subject = new Subject<{ id: string; status: Status }>();

  public constructor(orm: MikroORM) {
    this.orm = orm;
  }

  @UseRequestContext()
  public async execute(output: ToolControllerOutput) {
    const resultRepository = this.orm.em.getRepository(Result);
    const result = await resultRepository.findOneOrFail({ id: output.id });
    if (this.isSuccess(output)) {
      result.status = Status.FINISHED;
      this.updateResults(result, output);
    }
    if (this.isFailed(output)) {
      result.status = Status.FAILED;
    }
    await resultRepository.persistAndFlush(result);

    this.subject.next({ id: result.id, status: result.status });
  }

  private updateResults(dbResult: Result, { results }: SuccessStatus) {
    dbResult.results = results.map(function (res) {
      const resultData = new ResultData(res);
      resultData.services = res.services.map(function (service) {
        const s = new Service(service);
        return s;
      });
      return resultData;
    });
  }

  private isSuccess(output: ToolControllerOutput): output is SuccessStatus {
    return output.status === "success";
  }

  private isFailed(output: ToolControllerOutput): output is FailedStatus {
    return output.status === "failed";
  }

  public subscribe() {
    return this.subject.asObservable().pipe(
      map((result) => {
        return {
          data: result,
        };
      })
    );
  }
}
