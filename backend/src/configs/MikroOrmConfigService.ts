import { Injectable, NotFoundException } from "@nestjs/common";
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

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public createMikroOrmOptions(): MikroOrmModuleOptions<PostgreSqlDriver> {
    const uri = this.configService.get<string>("database.URI");

    return {
      type: "postgresql",
      clientUrl: uri,
      debug: this.configService.get<string>("NODE_ENV") === "development",
      entities: ["dist/entities"],
      entitiesTs: ["src/entities"],
      metadataProvider: TsMorphMetadataProvider,
      forceUtcTimezone: true,
      findOneOrFailHandler: function (entityName) {
        return new NotFoundException(`${entityName} not found`);
      },
      forceEntityConstructor: true,
      forceUndefined: true,
      validate: true,
      strict: true,
    };
  }
}
