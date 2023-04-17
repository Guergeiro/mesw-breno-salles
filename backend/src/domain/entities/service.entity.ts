import { ServiceRepository } from "@domain/repositories/service.repository";
import {
  ArrayType,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Decomposition } from "./decomposition.entity";

export type ServiceProps = {
  name: string;
  modules: string[];
};

@Entity({ customRepository: () => ServiceRepository })
export class Service extends BaseEntity {
  @Property()
  public name!: string;

  @Property({ type: ArrayType })
  public modules: string[] = [];

  @ManyToOne()
  public decomposition!: Decomposition;

  @ManyToMany(() => Service, (service) => service.relationships)
  public relatedServices = new Collection<Service>(this);

  @ManyToMany(() => Service, (service) => service.relatedServices, {
    owner: true,
  })
  public relationships = new Collection<Service>(this);

  public constructor({ name, modules }: ServiceProps) {
    super();
    this.name = name;
    this.modules = modules;
  }
}
