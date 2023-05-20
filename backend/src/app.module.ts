import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { ApplicationModule } from "@application/application.module";
import { environment } from "@configs/environment";
import { MikroOrmConfigService } from "@configs/MikroOrmConfigService";
import { MikroORM } from "@mikro-orm/core";
import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { DatabaseSeeder } from "@seeders/database.seeder";

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
    ApplicationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  private readonly orm: MikroORM;
  private readonly configService: ConfigService;

  public constructor(orm: MikroORM, configService: ConfigService) {
    this.orm = orm;
    this.configService = configService;
  }

  public async onModuleInit() {
    const generator = this.orm.getSchemaGenerator();
    await generator.ensureDatabase();
    if (this.configService.get<string>("NODE_ENV") !== "production") {
      await generator.dropSchema();
      await generator.createSchema();
      await generator.updateSchema();
    }
    await this.orm.getSeeder().seed(DatabaseSeeder);
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes("*");
  }
}
