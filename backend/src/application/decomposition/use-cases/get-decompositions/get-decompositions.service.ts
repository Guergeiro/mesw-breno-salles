import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { Injectable } from "@nestjs/common";
import { GetDecompositionsQueryDto } from "./get-decompositions-query.dto";

@Injectable()
export class GetDecompositionsService {
  private readonly decompositionRepository: DecompositionRepository;

  public constructor(
    decompositionRepository: DecompositionRepository
  ) {
    this.decompositionRepository = decompositionRepository;
  }

  public async execute(query: GetDecompositionsQueryDto) {
    console.log(query)
  }
}
