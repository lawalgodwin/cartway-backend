import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from 'src/helpers';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }
    try {
      const user = await verifyJwtToken(authJwtToken);
      if (user) {
        req['user'] = user;
      }
    } catch (error) {
      Logger.log('Error handling authentication', error);
    }
    next();
  }
}
