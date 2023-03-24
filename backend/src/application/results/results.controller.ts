import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Sse,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ToolControllerOutput } from "shared-tools";
import { CreateResultRequestDto } from "./use-cases/create-result/create-result-request.dto";
import { CreateResultService } from "./use-cases/create-result/create-result.service";
import { GetResultService } from "./use-cases/get-result/get-result.service";
import { GetResultsService } from "./use-cases/get-results/get-results.service";
import { ReceiveResultService } from "./use-cases/receive-result/receive-result.service";

@Controller("results")
@ApiTags("results")
export class ResultsController {
  private readonly getResultsService: GetResultsService;
  private readonly getResultService: GetResultService;
  private readonly createResultService: CreateResultService;
  private readonly receiveResultService: ReceiveResultService;

  public constructor(
    getResultsService: GetResultsService,
    getResultService: GetResultService,
    createResultService: CreateResultService,
    receiveResultService: ReceiveResultService
  ) {
    this.getResultsService = getResultsService;
    this.getResultService = getResultService;
    this.createResultService = createResultService;
    this.receiveResultService = receiveResultService;
  }

  @Sse("sse")
  public resultServerSentEvent() {
    return this.receiveResultService.subscribe();
  }

  @Get(":id")
  public async getResult(@Param("id") id: string) {
    return await this.getResultService.execute(id);
  }

  @Get()
  public async getResults(@Query() query: PaginatorQueryDto) {
    return await this.getResultsService.execute(query);
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateResultRequestDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  public async createResult(
    @Body() body: CreateResultRequestDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "zip",
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file?: Express.Multer.File
  ) {
    if (file == null) {
      throw new BadRequestException();
    }
    return await this.createResultService.execute(body, file);
  }

  @EventPattern("end")
  public async receiveResult(output: ToolControllerOutput) {
    return await this.receiveResultService.execute(output);
  }
}
