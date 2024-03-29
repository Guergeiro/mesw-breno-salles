import { CommonModule } from "@common/common.module";
import { Decomposition } from "@domain/entities/decomposition.entity";
import { User } from "@domain/entities/user.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CacheModule, Module } from "@nestjs/common";
import { DecompositionsController } from "./decompositions.controller";
import { ExportDecompositionService } from "./use-cases/export-decomposition/export-decomposition.service";
import { GetDecompositionService } from "./use-cases/get-decomposition/get-decomposition.service";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Module({
  controllers: [DecompositionsController],
  imports: [
    MikroOrmModule.forFeature([Decomposition, User]),
    CacheModule.register({
      ttl: 3600000,
    }),
    CommonModule,
  ],
  providers: [
    GetDecompositionsService,
    GetDecompositionService,
    ExportDecompositionService,
  ],
})
export class DecompositionsModule {}
