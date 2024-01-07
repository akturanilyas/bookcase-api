import { Schema } from 'express-validator';
import { AbstractValidation } from './AbstractValidation.abstract';

export class UserValidation extends AbstractValidation {
  public createUserValidation = (): Schema => ({
    name: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid name.',
      isLength: { options: { max: 200 } },
    },
  });

  public showUserValidation = (): Schema => ({
    userId: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Provide valid user id.',
    },
  });
}
