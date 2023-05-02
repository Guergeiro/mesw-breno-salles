import { Decomposition } from "@domain/entities/decomposition.entity";
import { Result, Status } from "@domain/entities/result.entity";
import { Service } from "@domain/entities/service.entity";
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
      result.decompositions.add(this.createDecompositions(output));
    }
    if (this.isFailed(output)) {
      result.status = Status.FAILED;
    }
    await this.orm.em.persistAndFlush(result);

    await result.decompositions.init();

    this.subject.next({ id: result.id, status: result.status });
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
