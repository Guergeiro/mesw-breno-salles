import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetToolsService } from "./use-cases/get-tools/get-tools.service";
import { TestService } from "./use-cases/test/test.service";

@Controller("tools")
@ApiTags("tools")
export class ToolsController {
  private readonly getToolsService: GetToolsService;
  private readonly testService: TestService;

  public constructor(
    getToolsService: GetToolsService,
    testService: TestService
  ) {
    this.getToolsService = getToolsService;
    this.testService = testService;
  }

  @Get()
  public async getTools(@Query() query: PaginatorQueryDto) {
    return await this.getToolsService.execute(query);
  }
}
