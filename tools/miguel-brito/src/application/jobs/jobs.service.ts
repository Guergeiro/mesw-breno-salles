import { Injectable } from "@nestjs/common";
import { promisify } from "node:util";
import { exec as e } from "node:child_process";
import { readFile } from "node:fs/promises";
const exec = promisify(e);

type Service = {
  name: string;
  modules: Array<string>;
};

type Decomposition = Array<{
  metadata: {
    modularity: number;
    resolution: number;
  };
  services: Array<Service>;
}>;

@Injectable()
export class JobsService {
  public async execute(): Promise<Decomposition> {
    // await this.calculateMicroservices();
    const projects = await this.parseData();
    return this.getDecomposition(projects);
  }

  private async calculateMicroservices() {
    await exec(
      "cd /usr/src/app/tool/app && python3 /usr/src/app/tool/app/main.py --project /usr/src/app/project"
    );
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

  private getDecomposition(projects: string[][]): Decomposition {
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
