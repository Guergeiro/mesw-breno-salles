import { ToolRepository } from "@domain/repositories/tool.repository";
import {
  Collection,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Language } from "./language.entity";
import { Result } from "./result.entity";

@Entity({ customRepository: () => ToolRepository })
export class Tool extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  @Unique()
  @Index()
  public slug = "";

  @OneToMany(() => Result, (result) => result.tool)
  public results = new Collection<Result>(this);

  @ManyToMany(() => Language, (language) => language.tools, { owner: true })
  public languages = new Collection<Language>(this);
}
