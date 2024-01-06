import { NextFunction, Request, Response } from 'express';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { UserService } from '../services/UserService';

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  if (!userId) {
    throw new UserNotFoundException();
  }

  try {
    await new UserService().getUser({ params: { id: Number(userId) } });
  } catch (e) {
    res.status(404).send({ message: 'User not found' });
  }

  next();
};
