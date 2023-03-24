import { ResultRepository } from "@domain/repositories/result.repository";
import {
  ArrayType,
  Embeddable,
  Embedded,
  Entity,
  Enum,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Tool } from "./tool.entity";

@Embeddable()
export class Parameters {
  @Property()
  public k_topics?: number;

  @Property()
  public resolution?: number;
}

export type MetadataProps = {
  resolution: number;
  modularity: number;
};

@Embeddable()
export class Metadata {
  @Property()
  public resolution!: number;

  @Property()
  public modularity!: number;

  public constructor({ resolution, modularity }: MetadataProps) {
    this.resolution = resolution;
    this.modularity = modularity;
  }
}

export type ServiceProps = {
  name: string;
  modules: string[];
};

@Embeddable()
export class Service {
  @Property()
  public name!: string;

  @Property({ type: ArrayType })
  public modules: string[] = [];

  public constructor({ name, modules }: ServiceProps) {
    this.name = name;
    this.modules = modules;
  }
}

export type ResultDataProps = {
  metadata: MetadataProps;
};

@Embeddable()
export class ResultData {
  @Embedded()
  public metadata: Metadata;

  @Embedded()
  public services: Service[] = [];

  public constructor({ metadata }: ResultDataProps) {
    this.metadata = new Metadata(metadata);
  }
}

@Entity({ customRepository: () => ResultRepository })
export class Result extends BaseEntity {
  @ManyToOne()
  public tool!: Tool;

  @Enum(() => Status)
  public status: Status = Status.STARTED;

  @Embedded()
  public parameters?: Parameters;

  @Embedded()
  public results: ResultData[] = [];
}

export const Status = {
  STARTED: "started",
  FINISHED: "finished",
  FAILED: "failed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
