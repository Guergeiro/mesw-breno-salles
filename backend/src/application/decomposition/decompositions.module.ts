import { CommonModule } from "@common/common.module";
import { Decomposition } from "@domain/entities/decomposition.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CacheModule, Module } from "@nestjs/common";
import { DecompositionsController } from "./decompositions.controller";
import { GetDecompositionService } from "./use-cases/get-decomposition/get-decomposition.service";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Module({
  controllers: [DecompositionsController],
  imports: [
    MikroOrmModule.forFeature([Decomposition]),
    CacheModule.register({
      ttl: 3600000,
    }),
    CommonModule,
  ],
  providers: [GetDecompositionsService, GetDecompositionService],
})
export class DecompositionsModule {}
