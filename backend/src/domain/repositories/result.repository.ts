import { Result } from "@domain/entities/result.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class ResultRepository extends EntityRepository<Result> {}
