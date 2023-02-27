import { Module } from "@nestjs/common";
import { ResultsModule } from "./results/results.module";
import { ToolsModule } from "./tools/tools.module";

@Module({
  imports: [ResultsModule, ToolsModule],
})
export class ApplicationModule {}
