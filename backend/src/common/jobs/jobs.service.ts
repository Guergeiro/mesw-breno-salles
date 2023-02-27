import { Inject, Injectable } from "@nestjs/common";
import { ClientRedis } from "@nestjs/microservices";
import { MiguelBritoInput } from "shared-tools";

type SlugObject = { slug: string };

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>;

type InputUnion = PartialExcept<MiguelBritoInput, "id">;

type StartJobDto = InputUnion & SlugObject;

@Injectable()
export class JobsService {
  private readonly redisClient: ClientRedis;

  public constructor(@Inject("REDIS_CLIENT") redisClient: ClientRedis) {
    this.redisClient = redisClient;
  }

  public async start({ slug, ...rest }: StartJobDto) {
    this.redisClient.emit<void, InputUnion>(`start_${slug}`, rest);
  }
}
