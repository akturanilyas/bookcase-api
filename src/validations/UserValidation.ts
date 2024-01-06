import { Schema } from 'express-validator';
import { AbstractValidation } from './AbstractValidation';

export class UserValidation extends AbstractValidation {
  public createUserValidation = (): Schema => ({
    name: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid name.',
    },
  });

  public showUserValidation = (): Schema => ({
    userId: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid user id.',
    },
  });
}
