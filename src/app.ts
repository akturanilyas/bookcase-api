import cors from 'cors';
import express, { Request, Response } from 'express';
import { routeBuilder } from './builders/routeBuilder';
import { errorHandler } from './middlewares/errors.middleware';

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: [AKTURAN] Fix CORS
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.get(`/api`, (req: Request, res: Response) => {
  res.send('Hello world');
});

routeBuilder(app).then(() => {
  app.use(errorHandler);
});
