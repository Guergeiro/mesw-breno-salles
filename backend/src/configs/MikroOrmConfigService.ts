import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import {
  MikroOrmOptionsFactory,
  MikroOrmModuleOptions,
} from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  private readonly configService: ConfigService;
  private readonly logger = new Logger("MikroORM");

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public createMikroOrmOptions(): MikroOrmModuleOptions<PostgreSqlDriver> {
    const uri = this.configService.get<string>("database.URI");

    return {
      type: "postgresql",
      clientUrl: uri,
      debug: this.configService.get<string>("NODE_ENV") === "development",
      entities: ["dist/domain/entities"],
      entitiesTs: ["src/domain/entities"],
      metadataProvider: TsMorphMetadataProvider,
      forceUtcTimezone: true,
      findOneOrFailHandler: function (entityName) {
        return new NotFoundException(`${entityName} not found`);
      },
      forceEntityConstructor: true,
      forceUndefined: true,
      validate: true,
      strict: true,
      logger: this.logger.log.bind(this.logger),
      // loadStrategy: LoadStrategy.JOINED,
      seeder: {
        path: "dist/seeders",
        pathTs: "src/seeders",
        defaultSeeder: "DatabaseSeeder",
        glob: "!(*.d).{js,ts}",
        emit: "ts",
        fileName: (className: string) => className,
      },
      driverOptions: {
        keepAlive: true,
      },
    };
  }
}
