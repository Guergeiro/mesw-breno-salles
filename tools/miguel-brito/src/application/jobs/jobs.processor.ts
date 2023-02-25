import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Job } from "bull";
import { JobsService } from "./jobs.service";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { exec as e } from "node:child_process";
import { MiguelBritoInput, MiguelBritoOutput } from "shared-tools";
import { RpcException } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
const exec = promisify(e);

type ProcessResult = Extract<
  MiguelBritoOutput,
  { status: "success" }
>["results"];

@Processor("miguel-brito")
export class JobsProcessor {
  private readonly jobsService: JobsService;
  private readonly logger = new Logger(JobsProcessor.name);

  public constructor(jobsService: JobsService) {
    this.jobsService = jobsService;
  }

  @Process()
  public async process(job: Job<MiguelBritoInput["parameters"]>) {
    await this.calculateMicroservices(job.data);
    const projects = await this.parseData();
    return this.getDecomposition(projects);
  }

  @OnQueueActive()
  public async onStart(job: Job<MiguelBritoInput["parameters"]>) {
    this.logger.log(`Started processing job ${job.id}`)
  }

  @OnQueueCompleted()
  public async onFinish(
    job: Job<MiguelBritoInput["parameters"]>,
    result: ProcessResult
  ) {
    this.logger.log(`Finished processing job ${job.id}`)
    await this.jobsService.endJob({
      id: job.id as string,
      status: "success",
      results: result,
    });
  }

  @OnQueueFailed()
  public async onFail(job: Job<MiguelBritoInput["parameters"]>, error: Error) {
    this.logger.log(`Failed processing job ${job.id}`)
    await this.jobsService.endJob({
      id: job.id as string,
      status: "failed",
      error: new RpcException(error),
    });
  }

  private async calculateMicroservices(
    parameters?: MiguelBritoInput["parameters"]
  ) {
    const prompt = [
      "cd",
      "/usr/src/app/tool/app",
      "&&",
      "python3",
      "/usr/src/app/tool/app/main.py",
    ];
    prompt.push("--project", "/usr/src/app/project");
    for (const [key, value] of Object.entries(parameters || {})) {
      prompt.push(`--${key}`, `${value}`);
    }
    await exec(prompt.join(" "));
    const {stdout }=await exec("cat /usr/src/app/tool/projects.json");
    console.log(stdout)
  }

  private async parseData() {
    const file = await readFile("/usr/src/app/tool/app/clustering.txt", "utf8");
    return file
      .split(
        "----------------------------------------------------------------------------------------------------\n----------------------------------------------------------------------------------------------------\n----------------------------------------------------------------------------------------------------"
      )
      .reduce(function (acc, cur) {
        acc.push(...cur.split("\n\n\n\n"));
        return acc;
      }, [] as string[])
      .reduce(function (acc, cur) {
        acc.push(...cur.split("\n\n\n\n"));
        return acc;
      }, [] as string[])
      .reduce(function (acc, cur) {
        acc.push(cur.split("\n\n"));
        return acc;
      }, [] as string[][])
      .reduce(function (acc, cur) {
        acc.push(
          cur.filter(function (v) {
            return v.length !== 0;
          })
        );
        return acc;
      }, [] as string[][])
      .filter(function (v) {
        return v.length !== 0;
      })
      .reduce(function (acc, cur) {
        const out: string[] = [];
        const first = cur.shift();
        if (first != null) {
          const [modularity, resolution, ...rest] = first.split("\n");
          out.push(modularity, resolution, rest.join("\n"));
        }
        out.push(...cur);
        acc.push(out);
        return acc;
      }, [] as string[][]);
  }

  private getDecomposition(projects: string[][]): ProcessResult {
    return projects.map((project) => {
      const modularity = this.parseMetadata(project.shift());
      const resolution = this.parseMetadata(project.shift());
      const services = project.map((s) => {
        return this.parseService(s);
      });
      return {
        metadata: {
          modularity,
          resolution,
        },
        services,
      };
    });
  }

  private parseMetadata(line?: string) {
    if (line == null) {
      throw new Error();
    }
    const [_, value] = line.split(" ");
    return parseFloat(value);
  }

  private parseService(line: string) {
    const [name, ...modules] = line.split("\n");
    return {
      name,
      modules,
    };
  }
}
