import { Decomposition } from "@domain/entities/decomposition.entity";
import { Result, Status } from "@domain/entities/result.entity";
import { Service } from "@domain/entities/service.entity";
import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { map, Subject } from "rxjs";
import { ToolControllerOutput } from "shared-tools";

type SuccessStatus = Extract<ToolControllerOutput, { status: "success" }>;
type FailedStatus = Extract<ToolControllerOutput, { status: "failed" }>;
type StartedStatus = Extract<ToolControllerOutput, { status: "started" }>;

type SubjectResult = {
  id: string;
  status: Status;
} & (
  | {
      status: typeof Status.FAILED | typeof Status.FINISHED;
    }
  | {
      status: typeof Status.STARTED;
      prevision: number;
    }
);

@Injectable()
export class ReceiveResultService {
  private readonly orm: MikroORM;
  private readonly subject = new Subject<SubjectResult>();

  public constructor(orm: MikroORM) {
    this.orm = orm;
  }

  @UseRequestContext()
  public async end(output: ToolControllerOutput) {
    const resultRepository = this.orm.em.getRepository(Result);
    const result = await resultRepository.findOneOrFail({ id: output.id });
    if (this.isSuccess(output)) {
      result.status = Status.FINISHED;
      result.decompositions.add(this.createDecompositions(output));
      this.subject.next({
        id: result.id,
        status: result.status,
      });
    }
    if (this.isFailed(output)) {
      result.status = Status.FAILED;
      this.subject.next({
        id: result.id,
        status: result.status,
      });
    }
    await this.orm.em.persistAndFlush(result);
  }

  @UseRequestContext()
  public async progressResult(output: ToolControllerOutput) {
    const resultRepository = this.orm.em.getRepository(Result);
    const result = await resultRepository.findOneOrFail({ id: output.id });
    if (this.isStarted(output)) {
      this.subject.next({
        id: result.id,
        status: result.status,
        prevision: output.prevision,
      });
    }
  }

  private createDecompositions({ results }: SuccessStatus) {
    const decompositions = results.map(function ({ metadata, services }) {
      const decomposition = new Decomposition({ metadata });

      const nameServices = new Map<string, Service>();
      for (const service of services) {
        const existing = nameServices.get(service.name) ?? new Service(service);
        nameServices.set(service.name, existing);
      }

      for (const service of services) {
        const existing = nameServices.get(service.name);
        if (existing == null) {
          continue;
        }

        for (const relation of service.relationships) {
          const existingRelationship = nameServices.get(relation);
          if (existingRelationship == null) {
            continue;
          }
          existing.relationships.add(existingRelationship);
        }
      }

      decomposition.services.add([...nameServices.values()]);

      return decomposition;
    });
    return decompositions;
  }

  private isSuccess(output: ToolControllerOutput): output is SuccessStatus {
    return output.status === "success";
  }

  private isFailed(output: ToolControllerOutput): output is FailedStatus {
    return output.status === "failed";
  }

  private isStarted(output: ToolControllerOutput): output is StartedStatus {
    return output.status === "started";
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
