import { UserRepository } from "@domain/repositories/user.repository";
import { Collection, Entity, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Result } from "./result.entity";

@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntity {
  @OneToMany(() => Result, (result) => result.owner)
  public results = new Collection<Result>(this);
}
