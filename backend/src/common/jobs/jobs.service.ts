import { Inject, Injectable } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import { MiguelBritoInput } from "shared-tools";

type SlugObject = { slug: string };

type InputUnion = MiguelBritoInput;

type StartJobDto = InputUnion & SlugObject;

@Injectable()
export class JobsService {
  private readonly redisClient: ClientRedis;

  public constructor(@Inject("REDIS_CLIENT") redisClient: ClientRedis) {
    this.redisClient = redisClient;
  }

  public start({ slug, ...rest }: StartJobDto) {
    this.redisClient.emit<void, InputUnion>(`start_${slug}`, rest);
  }
}
