import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { RedisClientConfigService } from "shared-nestjs";
import { JobsController } from "./jobs.controller";
import {JobsService} from "./jobs.service"

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
  ],
  providers: [JobsService]
})
export class JobsModule {}
