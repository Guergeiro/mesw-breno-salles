import { Controller, Get, Inject } from "@nestjs/common";
import { ClientRedis, EventPattern } from "@nestjs/microservices";

@Controller("tools")
export class ToolsController {
  private readonly redisClient: ClientRedis;

  public constructor(@Inject("REDIS_CLIENT") redisClient: ClientRedis) {
    this.redisClient = redisClient;
  }

  @Get()
  public async getAll() {
    this.redisClient.emit("start", "ping");
    return { hello: "world" };
  }

  @EventPattern("end")
  public end(data: string) {
    console.log(data);
  }
}
