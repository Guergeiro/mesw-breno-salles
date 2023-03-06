import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
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
import { ReceiveResultService } from "./use-cases/receive-result/receive-result.service";

@Controller("results")
@ApiTags("results")
export class ResultsController {
  private readonly createResultService: CreateResultService;
  private readonly receiveResultService: ReceiveResultService;

  public constructor(
    createResultService: CreateResultService,
    receiveResultService: ReceiveResultService
  ) {
    this.createResultService = createResultService;
    this.receiveResultService = receiveResultService;
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

  @Sse()
  public resultServerSentEvent() {
    return this.receiveResultService.subscribe();
  }
}
