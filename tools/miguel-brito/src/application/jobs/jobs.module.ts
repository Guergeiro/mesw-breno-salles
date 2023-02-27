import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { RedisClientConfigService, S3ClientService } from "shared-nestjs";
import { JobsController } from "./jobs.controller";
import { JobsProcessor } from "./jobs.processor";
import { JobsService } from "./jobs.service";

@Module({
  controllers: [JobsController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: "REDIS_CLIENT",
        useClass: RedisClientConfigService,
        inject: [ConfigService],
      },
    ]),
    BullModule.registerQueue({ name: "miguel-brito" }),
  ],
  providers: [JobsService, JobsProcessor, S3ClientService],
})
export class JobsModule {}
