import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const UserDecorator = createParamDecorator(function (
  data: string,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest<Request>();
  // @ts-expect-error user can exist
  const user = request.user;

  if (data == null) {
    return user;
  }
  return user?.[data];
});
