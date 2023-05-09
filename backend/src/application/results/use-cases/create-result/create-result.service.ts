import { JobsService } from "@common/jobs/jobs.service";
import { Result } from "@domain/entities/result.entity";
import { User } from "@domain/entities/user.entity";
import { ResultRepository } from "@domain/repositories/result.repository";
import { ToolRepository } from "@domain/repositories/tool.repository";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { S3ClientService } from "shared-nestjs";
import { CreateResultRequestDto } from "./create-result-request.dto";

@Injectable()
export class CreateResultService {
  private readonly toolRepository: ToolRepository;
  private readonly resultRepository: ResultRepository;
  private readonly s3ClientService: S3ClientService;
  private readonly jobsService: JobsService;

  public constructor(
    toolsRepository: ToolRepository,
    resultRepository: ResultRepository,
    s3ClientService: S3ClientService,
    jobsService: JobsService
  ) {
    this.toolRepository = toolsRepository;
    this.resultRepository = resultRepository;
    this.s3ClientService = s3ClientService;
    this.jobsService = jobsService;
  }

  public async execute(
    user: User,
    { tool, ...rest }: CreateResultRequestDto,
    file: Express.Multer.File
  ) {
    const dbTool = await this.toolRepository.findOneOrFail({ id: tool });

    const result = new Result();
    result.id = randomUUID();
    result.tool = dbTool;
    result.owner = user;

    await this.s3ClientService.createObject({
      id: result.id,
      mimetype: file.mimetype,
      buffer: file.buffer,
    });

    await this.resultRepository.persistAndFlush(result);

    await this.jobsService.start({ slug: dbTool.slug, id: result.id, ...rest });
    return result;
  }
}
