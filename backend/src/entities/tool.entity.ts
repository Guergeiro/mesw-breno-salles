import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Result } from "./result.entity";

@Entity()
export class Tool extends BaseEntity {
  @Property()
  public name!: string;

  @Property()
  public slug!: string;

  @OneToMany(() => Result, (result) => result.tool)
  public results = new Collection<Result>(this);
}
