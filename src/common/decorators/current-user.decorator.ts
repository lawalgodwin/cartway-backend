import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUser = (ctx: ExecutionContext) => {
  const httpCtx = ctx.switchToHttp();
  const request = httpCtx.getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
