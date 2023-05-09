import { User } from "@domain/entities/user.entity";
import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { serialize } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetDecompositionService {
  private readonly decompositionRepository: DecompositionRepository;

  public constructor(decompositionRepository: DecompositionRepository) {
    this.decompositionRepository = decompositionRepository;
  }

  public async execute(user: User, id: string) {
    const decomposition = await this.decompositionRepository.findOneOrFail(
      {
        id,
        result: {
          owner: user,
        },
      },
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
