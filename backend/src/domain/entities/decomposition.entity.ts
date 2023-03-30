import { DecompositionRepository } from "@domain/repositories/decomposition.repository";
import {
  ArrayType,
  Embeddable,
  Embedded,
  Entity,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Result } from "./result.entity";

export type MetadataProps = {
  resolution: number;
  modularity: number;
};

@Embeddable()
export class Metadata {
  @Property()
  public resolution!: number;

  @Property()
  public modularity!: number;

  public constructor({ resolution, modularity }: MetadataProps) {
    this.resolution = resolution;
    this.modularity = modularity;
  }
}

export type ServiceProps = {
  name: string;
  modules: string[];
};

@Embeddable()
export class Service {
  @Property()
  public name!: string;

  @Property({ type: ArrayType })
  public modules: string[] = [];

  public constructor({ name, modules }: ServiceProps) {
    this.name = name;
    this.modules = modules;
  }
}

@Entity({ customRepository: () => DecompositionRepository })
export class Decomposition extends BaseEntity {
  @Embedded()
  public metadata: Metadata;

  @Embedded()
  public services: Service[] = [];

  @ManyToOne()
  public result!: Result;

  public constructor(props: MetadataProps) {
    super();
    this.metadata = props;
  }
}
