import "@total-typescript/ts-reset";
import { environment } from "@configs/environment";
import { NestFactory } from "@nestjs/core";
import { RedisOptions } from "@nestjs/microservices";
import { RedisOptionsFactory } from "shared-nestjs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const env = await environment();

  const app = await NestFactory.createMicroservice<RedisOptions>(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
    ...RedisOptionsFactory.getRedisOptions({
      HOST: env.redis.HOST,
      PORT: env.redis.PORT,
      USER: env.redis.USER,
      PASSWORD: env.redis.PASSWORD,
    }),
  });

  app.enableShutdownHooks();

  await app.listen();
}
export default bootstrap();
