import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { MiguelBritoInput, ToolController } from "shared-tools";
import { JobsService } from "./jobs.service";

@Controller()
export class JobsController implements ToolController {
  private readonly jobsService: JobsService;

  public constructor(jobsService: JobsService) {
    this.jobsService = jobsService;
  }

  @EventPattern("start_miguel-brito")
  public async start(input: MiguelBritoInput) {
    await this.jobsService.startJob(input);
  }
}
