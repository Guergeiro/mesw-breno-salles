import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { PaginatorService } from "@common/paginator/paginator.service";
import { Injectable } from "@nestjs/common";
import { GetDecompositionsQueryDto } from "./get-decompositions-query.dto";
import { FilterQuery, serialize } from "@mikro-orm/core";
import { Decomposition } from "@domain/entities/decomposition.entity";
import { User } from "@domain/entities/user.entity";

@Injectable()
export class GetDecompositionsService {
  private readonly decompositionRepository: DecompositionRepository;
  private readonly paginatorService: PaginatorService;

  public constructor(
    decompositionRepository: DecompositionRepository,
    paginatorService: PaginatorService
  ) {
    this.decompositionRepository = decompositionRepository;
    this.paginatorService = paginatorService;
  }

  public async execute(user: User, query: GetDecompositionsQueryDto) {
    const { offset, limit } = this.paginatorService.paginate(query);

    const filterQuery: FilterQuery<Decomposition> = {
      result: {
        owner: user,
      },
    };
    if (query.id != null) {
      filterQuery.id = {
        $in: query.id,
      };
    }
    const [results, count] = await this.decompositionRepository.findAndCount(
      filterQuery,
      {
        offset,
        limit,
        populate: [
          "services",
          "services.relationships",
          "services.relatedServices",
        ],
      }
    );
    return {
      data: results.map(function (result) {
        return serialize(result, {
          populate: [
            "services",
            "services.relationships",
            "services.relatedServices",
          ],
        });
      }),
      count,
      page: query.page,
    };
  }
}
