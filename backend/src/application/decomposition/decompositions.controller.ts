import { AuthGuard } from "@common/auth/auth.guard";
import { UserDecorator } from "@common/auth/user.decorator";
import { User } from "@domain/entities/user.entity";
import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExportDecompositionService } from "./use-cases/export-decomposition/export-decomposition.service";
import { GetDecompositionService } from "./use-cases/get-decomposition/get-decomposition.service";
import { GetDecompositionsQueryDto } from "./use-cases/get-decompositions/get-decompositions-query.dto";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Controller("decompositions")
@ApiTags("decompositions")
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
export class DecompositionsController {
  private readonly getDecompositionsService: GetDecompositionsService;
  private readonly getDecompositionService: GetDecompositionService;
  private readonly exportDecompositionService: ExportDecompositionService;

  public constructor(
    getDecompositionsService: GetDecompositionsService,
    getDecompositionService: GetDecompositionService,
    exportDecompositionService: ExportDecompositionService
  ) {
    this.getDecompositionsService = getDecompositionsService;
    this.getDecompositionService = getDecompositionService;
    this.exportDecompositionService = exportDecompositionService;
  }

  @Get()
  public async getDecompositions(
    @UserDecorator() user: User,
    @Query() query: GetDecompositionsQueryDto
  ) {
    return await this.getDecompositionsService.execute(user, query);
  }

  @Get(":id/export")
  public async exportDecomposition(
    @UserDecorator() user: User,
    @Param("id") id: string
  ) {
    return await this.exportDecompositionService.execute(user, id);
  }

  @Get(":id")
  public async getDecomposition(
    @UserDecorator() user: User,
    @Param("id") id: string
  ) {
    return await this.getDecompositionService.execute(user, id);
  }
}
