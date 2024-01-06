import { Schema } from 'express-validator';
import { AbstractValidation } from './AbstractValidation.abstract';

export class BookValidation extends AbstractValidation {
  public createBook = (): Schema => ({
    name: {
      isString: true,
      notEmpty: true,
      isLength: { options: { max: 200 } },
    },
  });
  public borrowBook = (): Schema => ({
    userId: {
      notEmpty: true,
      isString: true,
    },
    bookId: {
      notEmpty: true,
      isString: true,
    },
  });
  public returnBook = (): Schema => ({
    userId: {
      notEmpty: true,
      isString: true,
    },
    bookId: {
      notEmpty: true,
      isString: true,
    },
    score: {
      isNumeric: true,
      optional: true,
    },
  });
  public showBook = (): Schema => ({
    bookId: {
      notEmpty: true,
      isString: true,
    },
  });
}
