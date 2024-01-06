import { NextFunction, Request, Response } from 'express';
import { logger } from '../server';

export const errorHandler = (
  err: Record<string, unknown>,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  logger.info(
    `Received a ${req.method} request for ${req.url}. Error is: ${err.message}`,
  );

  return res
    .status((err.status as number) || (err.httpStatus as number) || 500)
    .json({
      message: err.message,
      status: err.status,
    })
    .send();
};
