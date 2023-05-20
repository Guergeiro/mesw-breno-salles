import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserService } from "./use-cases/create-user/create-user.service";
import { GetUserService } from "./use-cases/get-user/get-user.service";

@Controller("users")
@ApiTags("users")
export class UsersController {
  private readonly getUserService: GetUserService;
  private readonly createUserService: CreateUserService;

  public constructor(
    getUserService: GetUserService,
    createUserService: CreateUserService
  ) {
    this.getUserService = getUserService;
    this.createUserService = createUserService;
  }

  @Get(":id")
  public async getUser(@Param("id") id: string) {
    return await this.getUserService.execute(id);
  }

  @Post()
  public async createUser() {
    return await this.createUserService.execute();
  }
}
