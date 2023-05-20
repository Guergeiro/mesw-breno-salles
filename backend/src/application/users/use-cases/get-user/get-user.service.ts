import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserService {
  private readonly usersRepository: UserRepository;

  public constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(id: string) {
    return await this.usersRepository.findOneOrFail({ id: id });
  }
}
