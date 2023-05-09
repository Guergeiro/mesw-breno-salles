import { CommonModule } from "@common/common.module";
import { Result } from "@domain/entities/result.entity";
import { Tool } from "@domain/entities/tool.entity";
import { User } from "@domain/entities/user.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { S3ClientService } from "shared-nestjs";
import { ResultsController } from "./results.controller";
import { CreateResultService } from "./use-cases/create-result/create-result.service";
import { GetResultService } from "./use-cases/get-result/get-result.service";
import { GetResultsService } from "./use-cases/get-results/get-results.service";
import { ReceiveResultService } from "./use-cases/receive-result/receive-result.service";

@Module({
  controllers: [ResultsController],
  imports: [MikroOrmModule.forFeature([Tool, Result, User]), CommonModule],
  providers: [
    GetResultsService,
    GetResultService,
    CreateResultService,
    ReceiveResultService,
    S3ClientService,
  ],
})
export class ResultsModule {}
