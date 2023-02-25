import { JobsModule } from "@application/jobs/jobs.module";
import { environment } from "@configs/environment";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { QueueConfigService } from "shared-nestjs";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environment],
    }),
    BullModule.forRootAsync({
      useClass: QueueConfigService,
      inject: [ConfigService],
    }),
    JobsModule,
  ],
})
export class AppModule {}
