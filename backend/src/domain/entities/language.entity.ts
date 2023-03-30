import { LanguageRepository } from "@domain/repositories/language.repository";
import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Tool } from "./tool.entity";

@Entity({ customRepository: () => LanguageRepository })
export class Language extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  public slug = "";

  @ManyToMany()
  public tools = new Collection<Tool>(this);
}
