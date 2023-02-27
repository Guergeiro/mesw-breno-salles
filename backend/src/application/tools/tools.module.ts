import { CommonModule } from "@common/common.module";
import { Tool } from "@domain/entities/tool.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ToolsController } from "./tools.controller";
import { GetToolsService } from "./use-cases/get-tools/get-tools.service";
import { TestService } from "./use-cases/test/test.service";

@Module({
  controllers: [ToolsController],
  imports: [MikroOrmModule.forFeature([Tool]), CommonModule],
  providers: [GetToolsService, TestService],
})
export class ToolsModule {}
