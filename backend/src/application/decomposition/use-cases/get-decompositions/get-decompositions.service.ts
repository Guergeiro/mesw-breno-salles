import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import { PaginatorService } from "@common/paginator/paginator.service";
import { Injectable } from "@nestjs/common";
import { GetDecompositionsQueryDto } from "./get-decompositions-query.dto";
import { FilterQuery } from "@mikro-orm/core";
import { Decomposition } from "@domain/entities/decomposition.entity";

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

  public async execute(query: GetDecompositionsQueryDto) {
    const { offset, limit } = this.paginatorService.paginate(query);

    const filterQuery: FilterQuery<Decomposition> = {};
    if (query.id != null) {
      filterQuery.id = {
        $in: query.id
      }
    }
    const [results, count] = await this.decompositionRepository.findAndCount(
      filterQuery,
      { offset, limit, populate: ["services", "services.relationships"] }
    );
    return {
      data: results,
      count,
      page: query.page,
    };
  }
}
