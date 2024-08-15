import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getPaymentData = (ctx: ExecutionContext) => {
  const httpCtx = ctx.switchToHttp();
  const request = httpCtx.getRequest();
  const data = request['body']['eventData'];
  return data;
};

export const TransactionData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getPaymentData(ctx),
);
