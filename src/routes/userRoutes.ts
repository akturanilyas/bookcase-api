import { IRoute } from './IRoute.interface';
import { UserController } from '../controllers/UserController';
import { HttpMethod } from '../enums/httpMethod';
import { UserValidation } from '../validations/UserValidation';
import { ENDPOINT } from '../constants/endpoint.constant';

const userController = new UserController();
const userValidation = new UserValidation();

export const routes: Array<IRoute> = [
  {
    handler: userController.store,
    method: HttpMethod.POST,
    path: `${ENDPOINT.USERS}`,
    validate: userValidation.createUserValidation(),
  },
  {
    handler: userController.index,
    method: HttpMethod.GET,
    path: `${ENDPOINT.USERS}`,
  },
  {
    handler: userController.show,
    method: HttpMethod.GET,
    path: `${ENDPOINT.USERS}/:userId`,
    validate: userValidation.showUserValidation(),
  },
];
