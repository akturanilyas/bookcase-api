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
      isNumeric: true,
    },
    bookId: {
      notEmpty: true,
      isNumeric: true,
    },
  });
  public returnBook = (): Schema => ({
    userId: {
      notEmpty: true,
      isNumeric: true,
    },
    bookId: {
      notEmpty: true,
      isNumeric: true,
    },
    score: {
      isNumeric: true,
      optional: true,
      isInt: { options: { max: 10, min: 0 } },
    },
  });
  public showBook = (): Schema => ({
    bookId: {
      notEmpty: true,
      isNumeric: true,
    },
  });
}
