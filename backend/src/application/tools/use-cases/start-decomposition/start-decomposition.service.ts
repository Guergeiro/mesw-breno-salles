import { JobsService } from "@common/jobs/jobs.service";
import { Result } from "@entities/result.entity";
import { Tool } from "@entities/tool.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { StartDecompositionRequestDto } from "./start-decomposition-request.dto";

@Injectable()
export class StartDecompositionService {
  private readonly toolsRepository: EntityRepository<Tool>;
  private readonly resultsRepository: EntityRepository<Result>;
  private readonly jobsService: JobsService;

  public constructor(
    @InjectRepository(Tool) toolsRepository: EntityRepository<Tool>,
    @InjectRepository(Result) resultsRepository: EntityRepository<Result>,
    jobsService: JobsService
  ) {
    this.toolsRepository = toolsRepository;
    this.resultsRepository = resultsRepository;
    this.jobsService = jobsService;
  }

  public async execute(id: string, body: StartDecompositionRequestDto) {
    const tool = await this.toolsRepository.findOneOrFail({ id: id });

    const result = new Result();
    result.tool = tool;
    await this.resultsRepository.persistAndFlush(result);
    this.jobsService.start({ slug: tool.slug, id: result.id, ...body });
    return result;
  }
}
