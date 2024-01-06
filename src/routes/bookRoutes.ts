import { IRoute } from './IRoute.interface';
import { HttpMethod } from '../enums/httpMethod';
import { BookController } from '../controllers/BookController';
import { BookValidation } from '../validations/BookValidation';
import { ENDPOINT } from '../constants/endpoint.constant';

const controller = new BookController();
const validation = new BookValidation();

export const routes: Array<IRoute> = [
  {
    handler: controller.store,
    method: HttpMethod.POST,
    path: `${ENDPOINT.BOOKS}`,
    validate: validation.createBook(),
  },
  {
    handler: controller.index,
    method: HttpMethod.GET,
    path: `${ENDPOINT.BOOKS}`,
  },
  {
    handler: controller.show,
    method: HttpMethod.GET,
    path: `${ENDPOINT.BOOKS}/:bookId`,
    validate: validation.showBook(),
  },
  {
    handler: controller.borrowBook,
    method: HttpMethod.POST,
    path: `${ENDPOINT.USERS}/:userId${ENDPOINT.BORROW}/:bookId`,
    validate: validation.borrowBook(),
  },
  {
    handler: controller.returnBook,
    method: HttpMethod.POST,
    path: `${ENDPOINT.USERS}/:userId${ENDPOINT.RETURN}/:bookId`,
    validate: validation.returnBook(),
  },
];
