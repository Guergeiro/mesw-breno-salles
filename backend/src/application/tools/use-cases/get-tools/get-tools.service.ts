import { PaginatorQueryDto } from "@common/paginator/paginator-query.dto";
import { PaginatorService } from "@common/paginator/paginator.service";
import { Tool } from "@domain/entities/tool.entity";
import { ToolRepository } from "@domain/repositories/tool.repository";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetToolsService {
  private readonly toolRepository: ToolRepository;
  private readonly paginatorService: PaginatorService;

  public constructor(
    @InjectRepository(Tool) toolsRepository: ToolRepository,
    paginatorService: PaginatorService
  ) {
    this.toolRepository = toolsRepository;
    this.paginatorService = paginatorService;
  }

  public async execute(query: PaginatorQueryDto) {
    const { offset, limit } = this.paginatorService.paginate(query);
    const [tools, count] = await this.toolRepository.findAndCount(
      {},
      { offset, limit }
    );
    return {
      data: tools,
      count,
      page: query.page,
    };
  }
}