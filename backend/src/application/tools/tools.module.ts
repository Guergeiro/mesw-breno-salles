import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
    ClientsModule
} from "@nestjs/microservices";
import { RedisClientConfigService } from "shared-nestjs";
import { ToolsController } from "./tools.controller";
import { ToolsEventListener } from "./tools.event-listener";

@Module({
  controllers: [ToolsController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: "REDIS_CLIENT",
        useClass: RedisClientConfigService,
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ToolsEventListener],
})
export class ToolsModule {}
