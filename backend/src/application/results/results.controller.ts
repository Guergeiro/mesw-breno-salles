import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateResultRequestDto } from "./use-cases/create-result/create-result-request.dto";
import { CreateResultService } from "./use-cases/create-result/create-result.service";

@Controller("results")
@ApiTags("results")
export class ResultsController {
  private readonly createResultService: CreateResultService;

  public constructor(createResultService: CreateResultService) {
    this.createResultService = createResultService;
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateResultRequestDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  public async createResult(
    @Body() body: CreateResultRequestDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file == null) {
      throw new BadRequestException();
    }
    return await this.createResultService.execute(body, file);
  }
}
