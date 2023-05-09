import { ResultRepository } from "@domain/repositories/result.repository";
import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  Enum,
  Formula,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Decomposition } from "./decomposition.entity";
import { Tool } from "./tool.entity";
import { User } from "./user.entity";

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

  @ManyToOne({ hidden: true })
  public owner!: User;

  @Enum(() => Status)
  public status: Status = Status.STARTED;

  @Embedded()
  public parameters?: Parameters;

  @OneToMany(() => Decomposition, (decomposition) => decomposition.result)
  public decompositions = new Collection<Decomposition>(this);

  @Formula((alias) => {
    const decomposition = Decomposition.name.toLowerCase();
    const result = Result.name.toLowerCase();
    return `(SELECT COUNT(*) FROM ${decomposition} WHERE ${decomposition}.${result}_id=${alias}.id)`;
  })
  public decompositionsCount?: number;
}

export const Status = {
  STARTED: "started",
  FINISHED: "finished",
  FAILED: "failed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
