import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { UserRepository } from "@domain/repositories/user.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly usersRepository: UserRepository;

  public constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const [type, content] = request.headers.authorization?.split(" ") ?? [];
    if (type !== "Bearer") {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ id: content });
    if (user == null) {
      throw new UnauthorizedException();
    }

    // @ts-expect-error user can exist
    request["user"] = user;
    return true;
  }
}
