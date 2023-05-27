import { AuthGuard } from "@common/auth/auth.guard";
import { UserDecorator } from "@common/auth/user.decorator";
import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { User } from "@domain/entities/user.entity";
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
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async getResult(@UserDecorator() user: User, @Param("id") id: string) {
    return await this.getResultService.execute(user, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async getResults(
    @UserDecorator() user: User,
    @Query() query: PaginatorQueryDto
  ) {
    return await this.getResultsService.execute(user, query);
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateResultRequestDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async createResult(
    @UserDecorator() user: User,
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
    return await this.createResultService.execute(user, body, file);
  }

  @EventPattern("end")
  public async endResult(output: ToolControllerOutput) {
    return await this.receiveResultService.end(output);
  }

  @EventPattern("progress")
  public async progressResult(output: ToolControllerOutput) {
    return await this.receiveResultService.progressResult(output);
  }
}
