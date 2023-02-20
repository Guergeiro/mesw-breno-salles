import { environment } from "@configs/environment";
import { NestFactory } from "@nestjs/core";
import { RedisOptions, Transport } from "@nestjs/microservices";
import { NestExpressApplication } from "@nestjs/platform-express";
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

  const options: RedisOptions["options"] = {
    host: env.redis.HOST,
    port: env.redis.PORT,
  };
  if (env.redis.USER != null) {
    options.username = env.redis.USER;
  }
  if (env.redis.PASSWORD != null) {
    options.password = env.redis.PASSWORD;
  }

  app.connectMicroservice<RedisOptions>({
    transport: Transport.REDIS,
    options: options,
  });

  await app.startAllMicroservices();

  await app.listen(env.host.PORT, env.host.URL);
}
export default bootstrap().catch(console.error);