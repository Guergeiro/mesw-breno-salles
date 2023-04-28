import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetDecompositionsQueryDto } from "./use-cases/get-decompositions/get-decompositions-query.dto";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Controller("decompositions")
@ApiTags("decompositions")
export class DecompositionsController {
  private readonly getDecompositionsService: GetDecompositionsService;

  public constructor(getDecompositionsService: GetDecompositionsService) {
    this.getDecompositionsService = getDecompositionsService;
  }

  @Get()
  public async getDecompositions(@Query() query: GetDecompositionsQueryDto) {
    return await this.getDecompositionsService.execute(query);
  }
}
