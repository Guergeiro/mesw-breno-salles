import { JobsService } from "@common/jobs/jobs.service";
import { Result } from "@domain/entities/result.entity";
import { Tool } from "@domain/entities/tool.entity";
import { ResultRepository } from "@domain/repositories/result.repository";
import { ToolRepository } from "@domain/repositories/tool.repository";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { StartDecompositionRequestDto } from "./start-decomposition-request.dto";

@Injectable()
export class StartDecompositionService {
  private readonly toolRepository: ToolRepository;
  private readonly resultRepository: ResultRepository;
  private readonly jobsService: JobsService;

  public constructor(
    @InjectRepository(Tool) toolsRepository: ToolRepository,
    @InjectRepository(Result) resultsRepository: ResultRepository,
    jobsService: JobsService
  ) {
    this.toolRepository = toolsRepository;
    this.resultRepository = resultsRepository;
    this.jobsService = jobsService;
  }

  public async execute(id: string, body?: StartDecompositionRequestDto) {
    const tool = await this.toolRepository.findOneOrFail({ id: id });

    const result = new Result();
    result.tool = tool;
    await this.resultRepository.persistAndFlush(result);
    this.jobsService.start({ slug: tool.slug, id: result.id, ...body });
    return result;
  }
}
