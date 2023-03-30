import { Decomposition } from "@domain/entities/decomposition.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class DecompositionRepository extends EntityRepository<Decomposition> {}
