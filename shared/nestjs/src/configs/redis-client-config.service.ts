import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from "@nestjs/microservices";
import { RedisOptionsFactory } from "./redis-options.factory";

@Injectable()
export class RedisClientConfigService implements ClientsModuleOptionsFactory {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public createClientOptions(): ClientProvider {
    const HOST = this.configService.get<string>("redis.HOST");
    if (HOST == null) {
      throw new Error();
    }
    const PORT = this.configService.get<number>("redis.PORT");
    if (PORT == null) {
      throw new Error();
    }
    return RedisOptionsFactory.getRedisOptions({
      HOST: HOST,
      PORT: PORT,
      USER: this.configService.get<string>("redis.USER"),
      PASSWORD: this.configService.get<string>("redis.PASSWORD"),
    });
  }
}
