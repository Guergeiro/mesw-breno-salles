import { InjectQueue } from "@nestjs/bull";
import { Inject, Injectable } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import { Queue } from "bull";
import { MiguelBritoInput, MiguelBritoOutput, ToolService } from "shared-tools";
import { JobType } from "./jobs.processor";

@Injectable()
export class JobsService implements ToolService {
  private readonly redisClient: ClientRedis;
  private readonly queue: Queue<JobType>;

  public constructor(
    @Inject("REDIS_CLIENT") redisClient: ClientRedis,
    @InjectQueue("miguel-brito") queue: Queue<JobType>
  ) {
    this.redisClient = redisClient;
    this.queue = queue;
  }

  public async startJob({ id, parameters }: MiguelBritoInput) {
    await this.queue.add(parameters, { jobId: id });
  }

  public async progressJob(output: MiguelBritoOutput) {
    this.redisClient.emit("progress", output);
  }

  public async endJob(output: MiguelBritoOutput) {
    this.redisClient.emit<void, MiguelBritoOutput>("end", output);
  }
}
