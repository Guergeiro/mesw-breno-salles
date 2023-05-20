import { LanguageRepository } from "@domain/repositories/language.repository";
import {
  Collection,
  Entity,
  Index,
  ManyToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Tool } from "./tool.entity";

@Entity({ customRepository: () => LanguageRepository })
export class Language extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  @Unique()
  @Index()
  public slug = "";

  @ManyToMany(() => Tool, (tool) => tool.languages)
  public tools = new Collection<Tool>(this);
}
