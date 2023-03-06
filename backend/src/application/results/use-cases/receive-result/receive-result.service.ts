import { Result, Status } from "@domain/entities/result.entity";
import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { map, Subject } from "rxjs";
import { ToolControllerOutput } from "shared-tools";

@Injectable()
export class ReceiveResultService {
  private readonly orm: MikroORM;
  private readonly subject = new Subject<ToolControllerOutput>();

  public constructor(orm: MikroORM) {
    this.orm = orm;
  }

  @UseRequestContext()
  public async execute(output: ToolControllerOutput) {
    const resultRepository = this.orm.em.getRepository(Result);
    const result = await resultRepository.findOneOrFail({ id: output.id });
    if (output.status === "success") {
      result.status = Status.FINISHED;
    }
    if (output.status === "failed") {
      result.status = Status.FAILED;
    }
    await resultRepository.persistAndFlush(result);

    this.subject.next(output);
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
