import { User } from "@domain/entities/user.entity";
import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportDecompositionService {
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
    await decomposition.services.init();
    const out: string[] = [];
    for (const service of decomposition.services) {
      const outService: string[] = [];
      outService.push(service.name);
      outService.push(...service.modules);
      out.push(outService.join("\n"));
    }

    return out.join("\n\n");
  }
}
