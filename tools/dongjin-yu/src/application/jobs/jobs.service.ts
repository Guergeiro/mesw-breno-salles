import { InjectQueue } from "@nestjs/bull";
import { Inject, Injectable } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import { Queue } from "bull";
import { MiguelBritoInput, MiguelBritoOutput } from "shared-tools";

@Injectable()
export class JobsService {
  private readonly redisClient: ClientRedis;
  private readonly queue: Queue<MiguelBritoInput["parameters"]>;

  public constructor(
    @Inject("REDIS_CLIENT") redisClient: ClientRedis,
    @InjectQueue("miguel-brito") queue: Queue<MiguelBritoInput["parameters"]>
  ) {
    this.redisClient = redisClient;
    this.queue = queue;
  }

  public async startJob({ id, parameters }: MiguelBritoInput) {
    await this.queue.add(parameters, { jobId: id });
  }

  public async endJob(output: MiguelBritoOutput) {
    this.redisClient.emit<void, MiguelBritoOutput>("end", output);
  }
}
