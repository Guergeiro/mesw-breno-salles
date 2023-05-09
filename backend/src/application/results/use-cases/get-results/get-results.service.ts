import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { PaginatorService } from "@common/paginator/paginator.service";
import { User } from "@domain/entities/user.entity";
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

  public async execute(user: User, query: PaginatorQueryDto) {
    const { offset, limit } = this.paginatorService.paginate(query);
    const [results, count] = await this.resultRepository.findAndCount(
      { owner: user },
      { offset, limit, populate: ["tool", "tool.languages"] }
    );
    return {
      data: results,
      count,
      page: query.page,
    };
  }
}
