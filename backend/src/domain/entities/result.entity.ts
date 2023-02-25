import { ResultRepository } from "@domain/repositories/result.repository";
import { Entity, Enum, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Tool } from "./tool.entity";

@Entity({ customRepository: () => ResultRepository })
export class Result extends BaseEntity {
  @ManyToOne()
  public tool!: Tool;

  @Enum(() => Status)
  public status = Status.STARTED;
}

export const Status = {
  STARTED: "started",
  FINISHED: "finished",
  FAILED: "failed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
