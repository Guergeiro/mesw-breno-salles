import { environment } from "@configs/environment";
import { NestFactory } from "@nestjs/core";
import { RedisOptions } from "@nestjs/microservices";
import { NestExpressApplication } from "@nestjs/platform-express";
import { RedisOptionsFactory } from "shared-nestjs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const env = await environment();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      env.NODE_ENV === "production"
        ? ["error", "warn"]
        : ["error", "warn", "log", "debug", "verbose"],
  });

  app.enableShutdownHooks();

  app.connectMicroservice<RedisOptions>(
    RedisOptionsFactory.getRedisOptions({
      HOST: env.redis.HOST,
      PORT: env.redis.PORT,
      USER: env.redis.USER,
      PASSWORD: env.redis.PASSWORD,
    })
  );

  await app.startAllMicroservices();

  await app.listen(env.host.PORT, env.host.URL);
}
export default bootstrap().catch(console.error);
