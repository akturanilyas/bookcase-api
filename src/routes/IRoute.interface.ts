import { NextFunction, Request, Response } from 'express';
import { Schema } from 'express-validator';
import { HttpMethod } from '../enums/httpMethod';
import { Middleware } from '../enums/middleware';
import { AbstractResource } from '../resources/AbstractResource';

export interface IRoute {
  path: string;
  method: HttpMethod;
  middlewares?: Array<Middleware>;
  validate?: Schema;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<AbstractResource>;
}
