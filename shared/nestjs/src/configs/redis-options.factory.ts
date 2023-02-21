import { RedisOptions, Transport } from "@nestjs/microservices";

export type RedisConfigOptions = {
  HOST: string;
  PORT: number;
  USER?: string;
  PASSWORD?: string;
};

export abstract class RedisOptionsFactory {
  public static getRedisOptions(
    configObject: RedisConfigOptions
  ): RedisOptions {
    const options: RedisOptions["options"] = {
      host: configObject.HOST,
      port: configObject.PORT,
    };
    if (configObject.USER != null) {
      options.username = configObject.USER;
    }
    if (configObject.PASSWORD != null) {
      options.password = configObject.PASSWORD;
    }

    return {
      transport: Transport.REDIS,
      options,
    };
  }
}
