import { User } from "@domain/entities/user.entity";
import { ResultRepository } from "@domain/repositories/result.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetResultService {
  private readonly resultRepository: ResultRepository;

  public constructor(resultRepository: ResultRepository) {
    this.resultRepository = resultRepository;
  }

  public async execute(user: User, id: string) {
    return await this.resultRepository.findOneOrFail(
      { id: id, owner: user },
      {
        populate: ["tool", "tool.languages", "decompositions"],
      }
    );
  }
}
