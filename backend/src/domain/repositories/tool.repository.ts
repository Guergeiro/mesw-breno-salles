import { Tool } from "@domain/entities/tool.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class ToolRepository extends EntityRepository<Tool> {}
