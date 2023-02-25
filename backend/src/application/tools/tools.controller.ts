import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { MiguelBritoOutput } from "shared-tools";
import { StartDecompositionRequestDto } from "./use-cases/start-decomposition/start-decomposition-request.dto";
import { StartDecompositionService } from "./use-cases/start-decomposition/start-decomposition.service";
import { TestService } from "./use-cases/test/test.service";

@Controller("tools")
@ApiTags("tools")
export class ToolsController {
  private readonly startDecompositionService: StartDecompositionService;
  private readonly testService: TestService;

  public constructor(
    startDecompositionService: StartDecompositionService,
    testService: TestService
  ) {
    this.startDecompositionService = startDecompositionService;
    this.testService = testService;
  }

  @Get()
  public async getAll() {
    return await this.testService.execute();
  }

  @Patch(":id/ops/start")
  public async startDecomposition(
    @Param("id") id: string,
    @Body() body: StartDecompositionRequestDto
  ) {
    return await this.startDecompositionService.execute(id, body);
  }

  @EventPattern("end_miguel-brito")
  public end(output: MiguelBritoOutput) {
    console.log(output);
  }
}
