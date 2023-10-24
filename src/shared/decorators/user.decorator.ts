import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const userToken = ctx.switchToHttp().getRequest().headers.authorization;
    return new JwtService().decode(userToken.split(' ')[1]);
  },
);