import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { serialize } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetDecompositionService {
  private readonly decompositionRepository: DecompositionRepository;

  public constructor(decompositionRepository: DecompositionRepository) {
    this.decompositionRepository = decompositionRepository;
  }

  public async execute(id: string) {
    const decomposition = await this.decompositionRepository.findOneOrFail(
      { id },
      {
        populate: [
          "services",
          "services.relationships",
          "services.relatedServices",
        ],
      }
    );
    return serialize(decomposition, {
      populate: [
        "services",
        "services.relationships",
        "services.relatedServices",
      ],
    });
  }
}
