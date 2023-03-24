import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { PaginatorService } from "@common/paginator/paginator.service";
import { ResultRepository } from "@domain/repositories/result.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetResultsService {
  private readonly resultRepository: ResultRepository;
  private readonly paginatorService: PaginatorService;

  public constructor(
    toolsRepository: ResultRepository,
    paginatorService: PaginatorService
  ) {
    this.resultRepository = toolsRepository;
    this.paginatorService = paginatorService;
  }

  public async execute(query: PaginatorQueryDto) {
    const { offset, limit } = this.paginatorService.paginate(query);
    const [results, count] = await this.resultRepository.findAndCount(
      {},
      { offset, limit, populate: ["tool"] }
    );
    return {
      data: results,
      count,
      page: query.page,
    };
  }
}
