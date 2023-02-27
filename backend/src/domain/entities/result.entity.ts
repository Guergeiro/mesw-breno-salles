import { ResultRepository } from "@domain/repositories/result.repository";
import {
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

@Entity({ customRepository: () => ResultRepository })
export class Result extends BaseEntity {
  @ManyToOne()
  public tool!: Tool;

  @Enum(() => Status)
  public status: Status = Status.STARTED;

  @Embedded()
  public parameters?: Parameters;
}

export const Status = {
  STARTED: "started",
  FINISHED: "finished",
  FAILED: "failed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
