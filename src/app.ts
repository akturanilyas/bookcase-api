import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { routeBuilder } from './builders/routeBuilder';
import { errorHandler } from './middlewares/errors.middleware';

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.get(`/api`, (req: Request, res: Response) => {
  res.send('Hello world');
});

routeBuilder(app).then(() => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: 'Requested Path Not Found' });
  });

  app.use(errorHandler);
});
