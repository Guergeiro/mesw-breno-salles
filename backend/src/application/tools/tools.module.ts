import { RedisClientConfigService } from "@configs/RedisClientConfigService";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";
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
