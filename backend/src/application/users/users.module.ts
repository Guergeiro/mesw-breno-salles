import { User } from "@domain/entities/user.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CreateUserService } from "./use-cases/create-user/create-user.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  imports: [MikroOrmModule.forFeature([User])],
  providers: [CreateUserService],
})
export class UsersModule {}

