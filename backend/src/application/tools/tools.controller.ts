import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { Result } from "@domain/entities/result.entity";
import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MiguelBritoOutput } from "shared-tools";
import { GetToolsService } from "./use-cases/get-tools/get-tools.service";
import { StartDecompositionRequestDto } from "./use-cases/start-decomposition/start-decomposition-request.dto";
import { StartDecompositionService } from "./use-cases/start-decomposition/start-decomposition.service";
import { TestService } from "./use-cases/test/test.service";

@Controller("tools")
@ApiTags("tools")
export class ToolsController {
  private readonly getToolsService: GetToolsService;
  private readonly startDecompositionService: StartDecompositionService;
  private readonly testService: TestService;

  public constructor(
getToolsService: GetToolsService,
    startDecompositionService: StartDecompositionService,
    testService: TestService
  ) {
    this.getToolsService = getToolsService;
    this.startDecompositionService = startDecompositionService;
    this.testService = testService;
  }

  @Get()
  public async getTools(@Query() query: PaginatorQueryDto) {
    return await this.getToolsService.execute(query);
  }

  @Get("/test")
  public async getAll() {
    return await this.testService.execute();
  }

  @Patch(":id/ops/start")
  @ApiBody({type: StartDecompositionRequestDto, required: false})
  public async startDecomposition(
    @Param("id") id: string,
    @Body() body?: StartDecompositionRequestDto
  ) {
    return await this.startDecompositionService.execute(id, body);
  }

  @EventPattern("end_miguel-brito")
  public end(output: MiguelBritoOutput) {
    console.log(output);
  }
}
