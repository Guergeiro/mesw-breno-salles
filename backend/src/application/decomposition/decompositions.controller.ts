import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetDecompositionService } from "./use-cases/get-decomposition/get-decomposition.service";
import { GetDecompositionsQueryDto } from "./use-cases/get-decompositions/get-decompositions-query.dto";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Controller("decompositions")
@ApiTags("decompositions")
@UseInterceptors(CacheInterceptor)
export class DecompositionsController {
  private readonly getDecompositionsService: GetDecompositionsService;
  private readonly getDecompositionService: GetDecompositionService;

  public constructor(
    getDecompositionsService: GetDecompositionsService,
    getDecompositionService: GetDecompositionService
  ) {
    this.getDecompositionsService = getDecompositionsService;
    this.getDecompositionService = getDecompositionService;
  }

  @Get()
  public async getDecompositions(@Query() query: GetDecompositionsQueryDto) {
    return await this.getDecompositionsService.execute(query);
  }

  @Get(":id")
  public async getDecomposition(@Param("id") id: string) {
    return await this.getDecompositionService.execute(id);
  }
}
