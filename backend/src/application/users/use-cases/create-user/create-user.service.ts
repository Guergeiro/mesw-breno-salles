import { User } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserService {
  private readonly usersRepository: UserRepository;

  public constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute() {
    const user = new User();
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
