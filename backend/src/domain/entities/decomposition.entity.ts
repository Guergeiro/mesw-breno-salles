import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  FloatType,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Result } from "./result.entity";
import { Service } from "./service.entity";

export type MetadataProps = {
  resolution: number;
  modularity: number;
};

@Embeddable()
export class Metadata {
  @Property({type: FloatType})
  public resolution!: number;

  @Property({type: FloatType})
  public modularity!: number;

  public constructor({ resolution, modularity }: MetadataProps) {
    this.resolution = resolution;
    this.modularity = modularity;
  }
}

export type DecompositionProps = {
  metadata: Metadata;
};

@Entity({ customRepository: () => DecompositionRepository })
export class Decomposition extends BaseEntity {
  @Embedded()
  public metadata: Metadata;

  @OneToMany(() => Service, (service) => service.decomposition, {eager: true})
  public services = new Collection<Service>(this);

  @ManyToOne()
  public result!: Result;

  public constructor({ metadata }: DecompositionProps) {
    super();
    this.metadata = metadata;
  }
}
