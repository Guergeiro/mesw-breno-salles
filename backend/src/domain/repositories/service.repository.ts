import { Service } from "@domain/entities/service.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class ServiceRepository extends EntityRepository<Service> {}

