import "@total-typescript/ts-reset";
import { environment } from "@configs/environment";
import { NestFactory } from "@nestjs/core";
import { RedisOptions } from "@nestjs/microservices";
import { NestExpressApplication } from "@nestjs/platform-express";
import { RedisOptionsFactory } from "shared-nestjs";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestjsSwagger } from "@anatine/zod-nestjs";
import helmet from "helmet";

async function bootstrap() {
  const env = await environment();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      env.NODE_ENV === "production"
        ? ["error", "warn"]
        : ["error", "warn", "log", "debug", "verbose"],
  });

  if (env.NODE_ENV === "production") {
    app.use(helmet());
  }

  app.enableCors();
  app.enableShutdownHooks();

  app.connectMicroservice<RedisOptions>(
    RedisOptionsFactory.getRedisOptions({
      HOST: env.redis.HOST,
      PORT: env.redis.PORT,
      USER: env.redis.USER,
      PASSWORD: env.redis.PASSWORD,
    })
  );

  const config = new DocumentBuilder()
    .setTitle(env.NAME)
    .setDescription(`The ${env.NAME} Open API specification`)
    .setVersion(env.VERSION)
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("open-api", app, document);

  await app.startAllMicroservices();

  await app.listen(env.host.PORT, env.host.URL);
}
export default bootstrap().catch(console.error);
