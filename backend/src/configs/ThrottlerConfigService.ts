import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerOptionsFactory } from "@nestjs/throttler";

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public createThrottlerOptions() {
    const ttl = this.configService.get<number>("throttler.TTL");
    const limit = this.configService.get<number>("throttler.LIMIT");

    return {
      ttl,
      limit,
    };
  }
}
