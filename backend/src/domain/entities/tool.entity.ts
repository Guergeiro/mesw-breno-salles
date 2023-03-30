import { ToolRepository } from "@domain/repositories/tool.repository";
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Language } from "./language.entity";
import { Result } from "./result.entity";

@Entity({ customRepository: () => ToolRepository })
export class Tool extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  public slug = "";

  @OneToMany(() => Result, (result) => result.tool)
  public results = new Collection<Result>(this);

  @ManyToMany()
  public languages = new Collection<Language>(this);
}
