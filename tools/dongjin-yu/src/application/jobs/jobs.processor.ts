import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Job } from "bull";
import { S3ClientService } from "shared-nestjs";
import { MiguelBritoInput, MiguelBritoOutput } from "shared-tools";
import { JobsService } from "./jobs.service";

type ProcessResult = Extract<
  MiguelBritoOutput,
  { status: "success" }
>["results"];

@Processor("miguel-brito")
export class JobsProcessor {
  private readonly logger = new Logger(JobsProcessor.name);

  private readonly jobsService: JobsService;
  private readonly _s3ClientService: S3ClientService;

  public constructor(
    jobsService: JobsService,
    s3ClientService: S3ClientService
  ) {
    this.jobsService = jobsService;
    this._s3ClientService = s3ClientService;
  }

  @Process()
  public async process(job: Job<MiguelBritoInput["parameters"]>) {
    const decomposition: unknown[] = [];
    await job.progress(100);
    return decomposition;
  }

  @OnQueueProgress()
  public async onProgress(
    job: Job<MiguelBritoInput["parameters"]>,
    progress: number
  ) {
    this.logger.log(`Job ${job.id} ${progress}% processed`);
  }

  @OnQueueActive()
  public async onStart(job: Job<MiguelBritoInput["parameters"]>) {
    this.logger.log(`Started processing job ${job.id}`);
  }

  @OnQueueCompleted()
  public async onFinish(
    job: Job<MiguelBritoInput["parameters"]>,
    result: ProcessResult
  ) {
    this.logger.log(`Finished processing job ${job.id}`);
    await this.jobsService.endJob({
      id: job.id as string,
      status: "success",
      results: result,
    });
  }

  @OnQueueFailed()
  public async onFail(job: Job<MiguelBritoInput["parameters"]>, error: Error) {
    this.logger.log(`Failed processing job ${job.id}`);
    await this.jobsService.endJob({
      id: job.id as string,
      status: "failed",
      error: new RpcException(error),
    });
  }
}
