import { Controller, Inject } from "@nestjs/common";
import { ClientRedis, EventPattern } from "@nestjs/microservices";
import { JobsService } from "./jobs.service";

@Controller()
export class JobsController {
  private readonly redisClient: ClientRedis;
  private readonly jobsService: JobsService;

  public constructor(
    @Inject("REDIS_CLIENT") redisClient: ClientRedis,
    jobsService: JobsService
  ) {
    this.redisClient = redisClient;
    this.jobsService = jobsService;
  }

  @EventPattern("start_miguel_brito")
  public async start(data: string) {
    const services = await this.jobsService.execute();
    this.redisClient.emit("end_miguel_brito", services);
  }
}
