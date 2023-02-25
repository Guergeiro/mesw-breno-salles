import { CommonModule } from "@common/common.module";
import { Result } from "@domain/entities/result.entity";
import { Tool } from "@domain/entities/tool.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ToolsController } from "./tools.controller";
import { GetToolsService } from "./use-cases/get-tools/get-tools.service";
import { StartDecompositionService } from "./use-cases/start-decomposition/start-decomposition.service";
import { TestService } from "./use-cases/test/test.service";

@Module({
  controllers: [ToolsController],
  imports: [MikroOrmModule.forFeature([Tool, Result]), CommonModule],
  providers: [GetToolsService, StartDecompositionService, TestService],
})
export class ToolsModule {}
