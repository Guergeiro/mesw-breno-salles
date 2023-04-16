import { Decomposition } from "@domain/entities/decomposition.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { DecompositionsController } from "./decompositions.controller";
import { GetDecompositionsService } from "./use-cases/get-decompositions/get-decompositions.service";

@Module({
  controllers: [DecompositionsController],
  imports: [MikroOrmModule.forFeature([Decomposition])],
  providers: [GetDecompositionsService]
})
export class DecompositionsModule {}
