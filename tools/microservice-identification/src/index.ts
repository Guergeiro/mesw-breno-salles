import { environment } from "@configs/environment";
import { NestFactory } from "@nestjs/core";
import { RedisOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const env = await environment();

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

  const app = await NestFactory.createMicroservice<RedisOptions>(AppModule, {
    logger:
      env.NODE_ENV === "production"
        ? ["error", "warn"]
        : ["error", "warn", "log", "debug", "verbose"],
    transport: Transport.REDIS,
    options: options,
  });

  app.enableShutdownHooks();

  await app.listen();
}
export default bootstrap();
