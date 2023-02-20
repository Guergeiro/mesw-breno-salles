import { ToolsModule } from "@application/tools/tools.module";
import { environment } from "@configs/environment";
import { MikroOrmConfigService } from "@configs/MikroOrmConfigService";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environment],
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfigService,
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ToolsModule,
  ],
})
export class AppModule {}
