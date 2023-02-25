import { JobsService } from "@common/jobs/jobs.service";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class TestService {
  private readonly jobsService: JobsService;

  public constructor(jobsService: JobsService) {
    this.jobsService = jobsService;
  }

  public async execute() {
    const id = randomUUID();
    const input = {
      slug: "miguel-brito",
      id,
    };
    this.jobsService.start(input);
    return id;
  }
}
