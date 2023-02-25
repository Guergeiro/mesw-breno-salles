import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { RedisClientConfigService } from "shared-nestjs";
import { JobsService } from "./jobs/jobs.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "REDIS_CLIENT",
        useClass: RedisClientConfigService,
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [JobsService],
  exports: [JobsService],
})
export class CommonModule {}
