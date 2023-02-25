import { CommonModule } from "@common/common.module";
import { Result } from "@entities/result.entity";
import { Tool } from "@entities/tool.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ToolsController } from "./tools.controller";
import { StartDecompositionService } from "./use-cases/start-decomposition/start-decomposition.service";
import { TestService } from "./use-cases/test/test.service";

@Module({
  controllers: [ToolsController],
  imports: [MikroOrmModule.forFeature([Tool, Result]), CommonModule],
  providers: [StartDecompositionService, TestService],
})
export class ToolsModule {}
