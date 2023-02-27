import { CommonModule } from "@common/common.module";
import { Result } from "@domain/entities/result.entity";
import { Tool } from "@domain/entities/tool.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { S3ClientService } from "shared-nestjs";
import { ResultsController } from "./results.controller";
import { CreateResultService } from "./use-cases/create-result/create-result.service";

@Module({
  controllers: [ResultsController],
  imports: [MikroOrmModule.forFeature([Tool, Result]), CommonModule],
  providers: [CreateResultService, S3ClientService],
})
export class ResultsModule {}
