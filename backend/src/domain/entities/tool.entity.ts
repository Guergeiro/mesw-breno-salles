import { ToolRepository } from "@domain/repositories/tool.repository";
import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Result } from "./result.entity";

@Entity({ customRepository: () => ToolRepository })
export class Tool extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  public slug = "";

  @OneToMany(() => Result, (result) => result.tool)
  public results = new Collection<Result>(this);
}
