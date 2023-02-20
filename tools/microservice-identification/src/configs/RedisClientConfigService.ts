import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  RedisOptions,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class RedisClientConfigService implements ClientsModuleOptionsFactory {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public createClientOptions(): ClientProvider {
    const options: RedisOptions["options"] = {
      host: this.configService.get<string>("redis.HOST"),
      port: this.configService.get<number>("redis.PORT"),
    };

    const username = this.configService.get<string>("redis.USER");
    const password = this.configService.get<string>("redis.PASSWORD");
    if (username != null) {
      options.username = username;
    }
    if (password != null) {
      options.password = password;
    }
    return {
      transport: Transport.REDIS,
      options: options,
    };
  }
}
