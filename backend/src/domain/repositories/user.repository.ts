import { User } from "@domain/entities/user.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class UserRepository extends EntityRepository<User> {}
