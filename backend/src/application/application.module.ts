import { Module } from "@nestjs/common";
import { DecompositionsModule } from "./decomposition/decompositions.module";
import { ResultsModule } from "./results/results.module";
import { ToolsModule } from "./tools/tools.module";

@Module({
  imports: [ResultsModule, ToolsModule, DecompositionsModule],
})
export class ApplicationModule {}
