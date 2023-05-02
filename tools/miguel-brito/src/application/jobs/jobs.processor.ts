import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from "@nestjs/bull";
import { Job } from "bull";
import { JobsService } from "./jobs.service";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { exec as e } from "node:child_process";
import { MiguelBritoInput, MiguelBritoOutput } from "shared-tools";
import { RpcException } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { S3ClientService } from "shared-nestjs";
import { Readable } from "node:stream";
import AdmZip from "adm-zip";
const exec = promisify(e);

type ProcessResult = Extract<
  MiguelBritoOutput,
  { status: "success" }
>["results"];

@Processor("miguel-brito")
export class JobsProcessor {
  private readonly logger = new Logger(JobsProcessor.name);

  private readonly jobsService: JobsService;
  private readonly s3ClientService: S3ClientService;

  public constructor(
    jobsService: JobsService,
    s3ClientService: S3ClientService
  ) {
    this.jobsService = jobsService;
    this.s3ClientService = s3ClientService;
  }

  @Process()
  public async process(job: Job<MiguelBritoInput["parameters"]>) {
    const path = await this.downloadProject(job.id as string);
    await job.progress(20);
    await this.decompressProject(path);
    await job.progress(40);
    await this.calculateMicroservices(path, job.data);
    await job.progress(60);
    const projects = await this.parseData();
    await job.progress(80);
    const decomposition = this.getDecomposition(projects);
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

  private async downloadProject(id: string) {
    const { Body } = await this.s3ClientService.getObject(id);
    const path = `/usr/src/app/tool/app/${id}`;
    await writeFile(`${path}.zip`, Body as Readable);
    return path;
  }

  private async decompressProject(path: string) {
    const zip = new AdmZip(`${path}.zip`);
    return await new Promise<void>(function (resolve, reject) {
      zip.extractAllToAsync(path, true, false, function (error) {
        if (error != null) {
          return reject(error);
        }
        return resolve();
      });
    });
  }

  private async calculateMicroservices(
    projectPath: string,
    parameters?: MiguelBritoInput["parameters"]
  ) {
    const prompt = [
      "cd",
      "/usr/src/app/tool/app",
      "&&",
      "python3",
      "/usr/src/app/tool/app/main.py",
    ];
    prompt.push("--project", projectPath);
    for (const [key, value] of Object.entries(parameters || {})) {
      prompt.push(`--${key}`, `${value}`);
    }
    await exec(prompt.join(" "));
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

      this.randomizeRelationships(services);

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
      relationships: [],
    };
  }

  private randomizeRelationships(services: ProcessResult[number]["services"]) {
    for (const service of services) {
      const numRelationships =
        Math.floor(Math.random() * (services.length - 1)) + 1;
      const relatedServices = [];
      const serviceGenerator = this.getRandomService(services, service);

      for (let i = 0; i < numRelationships; i++) {
        const randomService = serviceGenerator.next().value;
        if (randomService != null) {
          relatedServices.push(randomService.name);
        }
      }

      service.relationships = relatedServices;
    }
  }

  private *getRandomService<
    T extends ProcessResult[number]["services"] = ProcessResult[number]["services"]
  >(services: T, exclude: T[number]) {
    while (true) {
      const randomIndex = Math.floor(Math.random() * services.length);
      const randomService = services[randomIndex];
      if (randomService !== exclude) {
        yield randomService;
      }
    }
  }
}
