import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

@Entity()
export class Tool extends BaseEntity {
  @Property()
  name!: string;
}
