import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserService } from "./use-cases/create-user/create-user.service";

@Controller("users")
@ApiTags("users")
export class UsersController {
  private readonly createUserService: CreateUserService;

  public constructor(createUserService: CreateUserService) {
    this.createUserService = createUserService;
  }

  @Post()
  public async createUser() {
    return await this.createUserService.execute();
  }
}
