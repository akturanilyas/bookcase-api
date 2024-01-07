import { NextFunction, Request, Response } from 'express';
import { Schema } from 'express-validator';
import { HttpMethodEnum } from '../enums/httpMethod.enum';
import { MiddlewareEnum } from '../enums/middleware.enum';
import { AbstractResource } from '../resources/AbstractResource.abstract';

export interface IRoute {
  path: string;
  method: HttpMethodEnum;
  middlewares?: Array<MiddlewareEnum>;
  validate?: Schema;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<AbstractResource<unknown>>;
}
