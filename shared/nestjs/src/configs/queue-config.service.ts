import {
    SharedBullConfigurationFactory
} from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }
  public createSharedConfiguration() {
    const HOST = this.configService.get<string>("queue.HOST");
    if (HOST == null) {
      throw new Error();
    }
    const PORT = this.configService.get<number>("queue.PORT");
    if (PORT == null) {
      throw new Error();
    }
    return {
      redis: {
        host: HOST,
        port: PORT,
      },
    };
  }
}
